import React, {  useEffect } from "react";
import { connect } from "react-redux";
import history from '../../util/history';

import {
  Form,
  Input,
  Select,
  Checkbox,
  Button,
  Modal,
} from "antd";
import signuppanner from "../../images/headerImages/signuppanner.svg";
import googlelogo from "../../images/headerImages/googlelogo.png";
import facebooklogo from "../../images/headerImages/facebooklogo.png";
import applelogo from "../../images/headerImages/applelogo.png";

import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { createUserAccount } from "../../redux/actions";


import "./styles.css";
const { Option } = Select;

function SignUp({
  createAccount,
  createUserAccount,
  showSignUp,
  hidePageSignUp,
  showPageSignUp,
  showPageLogin,
  setCheckLoginHeader
}) {
  const [form] = Form.useForm();
  useEffect(()=>{
    if(createAccount){
      setCheckLoginHeader(true)
      hidePageSignUp()
    }
  },[createAccount])

  const onFinish = (values) => {
    createUserAccount({
      email: values.email,
      password: values.password,
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone,
    });
    history.push("/")
    
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="84">+84</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  const renderFormSignUp = () => {
    return (
      <Form
        layout="vertical"
        form={form}
        name="register"
        onFinish={(values) => onFinish(values)}
        initialValues={
          (showSignUp === true ?{
            prefix: "+84",
            email: "",
            password: "",
            confirmPassword:"",
            firstName: "",
            lastName: "",
            agreement: false
          } : {prefix: "+84"}
            )
        }
        preserve={false}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              max: 80,
              message: "Email kh??ng ???????c v?????t qu?? 80 k?? t???!",
            },
            {
              type: "email",
              message: "?????nh d???ng ?????a ch??? email kh??ng h???p l???.",
            },
            {
              required: true,
              message: "Vui l??ng nh???p email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="M???t kh???u"
          rules={[
            {
              max: 20,
              message: "M???t kh???u kh??ng ???????c qu?? 20 k?? t???!",
            },
            {
              required: true,
              message: "Vui l??ng nh???p m???t kh???u!",
            },
            {
              min: 6,
              message: "M???t kh???u kh??ng ???????c nh??? h??n 6 k?? t???.",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="Nh???p l???i m???t kh???u"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              max: 20,
              message: "M???t kh???u kh??ng ???????c qu?? 20 k?? t???!",
            },
            {
              min: 6,
              message: "M???t kh???u kh??ng ???????c nh??? h??n 6 k?? t???",
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject("M???t kh???u kh??ng kh???p.H??y th??? l???i!");
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="firstName"
          label="H???"
          rules={[
            {
              max: 20,
              message: "H??? kh??ng ???????c qu?? 20 k?? t???!",
            },

            {
              required: true,
              message: "Vui l??ng nh???p h??? !",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="lastName"
          label="T??n v?? t??n ?????m"
          rules={[
            {
              max: 20,
              message: "T??n v?? t??n ?????m kh??ng ???????c qu?? 20 k?? t???!",
            },
            {
              required: true,
              message: "Vui l??ng nh???p t??n v?? t??n ?????m !",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="phone"
          label="S??? ??i???n tho???i"
          span={6}
          rules={[
            {
              required: true,
              message: "Vui l??ng nh???p s??? ??i???n tho???i!",
            },
            {
              pattern: (/(03|05|07|08|09)+([0-9]{8})\b/),
              message: 'S??? ??i???n tho???i kh??ng h???p l???!'
          }
          ]}
        >
          <Input
            addonBefore={prefixSelector}
            style={{
              width: "100%",
            }}
          />
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject("Vui l??ng ho??n t???t vi???c ki???m tra (??? tr??n)!"),
            },
          ]}
        >
          <Checkbox>
            Nh???n email v??? c??c khuy???n m??i ?????c quy???n t??? Arya. T??i c?? th??? b??? ????ng
            k?? b???t k??? l??c n??o nh?? ???? n??u trong Ch??nh s??ch B???o m???t.
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Button className="signUp-button" htmlType="submit">
            T???o t??i kho???n
          </Button>
        </Form.Item>
      </Form>
    );
  };

  return (
    <div>
      <Modal
        maskClosable="true"
        title="????ng k??"
        visible={showSignUp}
        width={840}
        onCancel={hidePageSignUp}
        onOk={showPageSignUp}
        centered="true"
        className="SignUpModal"
        destroyOnClose={true}
      >
        <div className="SignUpModal-container">
          <div className="SignUpModal-content">
            <div className="left-panner">
              <div className="SignUpContainer">
                <div className="SignUpContainer-header">
                  <h3>T???o t??i kho???n</h3>
                </div>
                <div className="SignUpContainer-body">{renderFormSignUp()}</div>
                <div className="SignUpContainer-social">
                  <div className="SignUpContainer-social-note" offset={2}>
                    <div className="horizontal-line"> </div>
                    <span>Ho???c ti???p t???c v???i</span>
                    <div className="horizontal-line"> </div>
                  </div>
                  <div className="SignUpContainer-social-button">
                    <div className="social-google-button social-button">
                      <div className="social-button-item">
                        <img src={googlelogo} alt="googlelogo" />
                        <span>Google</span>
                      </div>
                    </div>
                    <div className="facebook-apple-button">
                      <div className="social-facebook-button social-button">
                        <div className="social-button-item">
                          <img src={facebooklogo} alt="facebooklogo" />
                          <span>Facebook</span>
                        </div>
                      </div>
                      <div className="social-apple-button social-button">
                        <div className="social-button-item">
                          <img src={applelogo} alt="applelogo" />
                          <span>Apple</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="SignUpContainer-footer">
                    <div className="footer-horizontal-line"> </div>
                    <div className="SignUpContainer-footer-item">
                      <div span>B???n ???? c?? t??i kho???n?</div>
                      <div>
                        <Button type="primary" onClick={() => {
                          hidePageSignUp()
                          showPageLogin()
                        }}>????ng nh???p</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="right-panner">
              <div className="right-panner-container">
                <div className="right-panner-container-image">
                  <img src={signuppanner} alt="signuppanner" />
                </div>
                <div className="right-panner-container-text">
                  <p>
                    R??? H??N ?????n <span>30%</span> v???i ??u ????i n???i b??? c???a Arya!
                  </p>
                  <p> Gi?? gi???m ngay khi b???n ????ng k??.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <ToastContainer />
    </div>
  );
}
const mapStateToProps = (state) => {
  const { createAccount } = state.authReducer;
  return {
    createAccount
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    createUserAccount: (params) => dispatch(createUserAccount(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
