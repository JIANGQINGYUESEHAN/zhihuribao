import React, { useRef, useState } from "react";
import "./Login.less";
import { Form, Input, Toast } from "antd-mobile";
import NavBarAgain from "../../component/NavBarAgain/NavBarAgain";
import ButtonAgain from "../../component/ButtonAgain";
import utils from "../../assets/utils";
import api from "../../api/index";
import { connect } from "react-redux";
import action from "../../store/action";
function Login(props) {
  const [form] = Form.useForm();
  const [btnText, setBtnText] = useState("发送验证码");
  //是否可点击
  const [isClick, setIsClick] = useState(false);
  //定时器
  let time;
  let num = 31;

  function interval() {
    setIsClick(true);
    num--;
    if (num <= 0) {
      setBtnText("发送验证码");
      clearInterval(time);
      setIsClick(false);
      return;
    }

    setBtnText(`${num}秒后,重新发送`);
  }
  async function submit() {
    try {
      await form.validateFields();
      let { phone, code } = form.getFieldsValue();

      //判断token是否存在
      //不存在
      if (utils.storage.get("tk") == null) {
        //进行登录获取token
        let { code: codeHttp, token } = await api.login(phone, code);
        if (codeHttp !== 0) {
          Toast.show({
            content: "登录失败",
          });
          form.resetFields(["code"]);

          //登录成功 对token 进行存储 存储结束后发送请求
          utils.storage.set("tk", token);
        }
      }
      //存在 直接发请求

      await props.queryUserInfoAsync();

      // 显示登录成功
      Toast.show({
        content: "登录成功",
      });
      //然后判断[usp] 是否含值
      let to = props.usp.get("to");

      to ? props.navigate(to, { replace: true }) : props.navigate(-1);
    } catch (error) {
      Toast.show({
        content: "登录失败",
      });
    }
  }

  async function send() {
    //验证手机号
    try {
      await form.validateFields(["phone"]);
      //发送请求
      let { phone, code } = form.getFieldsValue();
      let result = await api.sendPhoneCode(phone);
      if (result.code !== 0) {
        Toast.show({
          content: "验证码发送失败",
        });
      }

      time = setInterval(interval, 1000);
    } catch (error) {
      Toast.show({
        content: "验证失败",
      });
    }
  }
  //自定义验证器
  let testObj = {
    testPhone(_, value) {
      value = value.trim();
      //判断是否存在
      if (!value) return Promise.reject("手机号必须填写");
      //判断是否符合手机号的正则
      let PhoneReg =
        /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/;
      if (!PhoneReg.test(value)) return Promise.reject("手机号不符合规范");
      return Promise.resolve();
    },
    testCode(_, value) {
      value = value.trim();
      if (!value) return Promise.reject("验证码必须填写");
      //判断是否符合手机号的正则
      let CodeReg = /^\d{4,6}$/;

      if (!CodeReg.test(value)) return Promise.reject("验证码不符合规范");
      return Promise.resolve();
    },
  };

  return (
    <div className="login">
      <Form
        initialValues={{
          phone: "13167732982",
          code: "342755",
        }}
        layout="horizontal"
        form={form}
        footer={
          <ButtonAgain
            color="primary"
            onClick={submit}
            className="bottom_button"
          >
            提交
          </ButtonAgain>
        }
      >
        <NavBarAgain title="登录/注册" />
        <Form.Item
          label="手机号"
          name="phone"
          rules={[{ validator: testObj.testPhone }]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          name="code"
          label="验证码"
          rules={[{ validator: testObj.testCode }]}
          extra={
            <ButtonAgain
              size="small"
              color="primary"
              onClick={send}
              disabled={isClick}
            >
              {btnText}
            </ButtonAgain>
          }
        >
          <Input placeholder="请输入" />
        </Form.Item>
      </Form>
    </div>
  );
}

export default connect(null, action.Base)(Login);
