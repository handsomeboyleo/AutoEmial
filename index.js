const nodemailer = require("nodemailer")
// 引入handlebars
const handlebars = require("handlebars")
// 引入mjml方法
const mjml2html = require("mjml")
const fs = require("fs")
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";     //使用伪造的 SSL 身份验证来检查我的客户端和服务器之间的通信,不然会报认证的错

// 使用handlebars对mjml文件进行编译
const template = handlebars.compile(fs.readFileSync("./template/test.mjml", "utf8"))
// 定义要传入的参数变量对象
const data = {
    user: "Leo",
    data:"Auto Email Success!",
}
// 将handlebars生成的mjml转为html
const html = mjml2html(template(data)).html
const transporter = nodemailer.createTransport({
    service: "qq", // 内置传输发送邮件
    /**
     * QQ邮箱设置POP3/SMTP的SSL加密方式
     * 使用SSL的通用配置如下： 
     * 接收邮件服务器：pop.qq.com，使用SSL，端口号995
     * 发送邮件服务器：smtp.qq.com，使用SSL，端口号465或587
     */
    port: 465, // 端口 
    secureConnection: true, // 安全ssl连接
    // 授权认证
    auth: {
        // 用来发送邮件的邮箱
        user: "example@qq.com",
        // 不是邮箱登录密码，是smtp授权码 
        pass: "yxcuqsnuuzxqbiei" //你的smtp授权码
    }
})

const mailOption = {
    from: "example@qq.com", // 发送的邮箱地址
    to: "example@qq.com", // 接收的邮箱地址
    subject: "测试邮件！", // 邮箱的标题
    html: html
}

// 发送邮件
transporter.sendMail(mailOption, (error, info) => {
    if (error) {
        return console.log(error)
    }
    // 成功会返回messageId
    console.log("Success! Message: ", info.messageId)
})
