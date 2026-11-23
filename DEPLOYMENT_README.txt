ACG 官网部署说明 / Hosting deployment guide

这是最新已发布版本（135）的完整静态网站，包括中英文页面、36 个项目、图片、样式和交互代码。
Source commit: b800ed7ab3445e29dff17c066c83152071e4f164

部署步骤
1. 在您的 hosting 文件管理器中上传并解压本 ZIP。
2. 将 index.html、app.js、projects.js、style.css 和 images 文件夹放到网站根目录（通常为 public_html 或 htdocs），不要多套一层文件夹。
3. 网站为静态 HTML/CSS/JavaScript，不是 WordPress 主题，不需要 Node、PHP、数据库或构建命令。
4. 网站使用 # 路由，通常不需要额外设置 URL 重写。首页文件必须为 index.html。
5. 按您的 hosting 服务商提供的 IP 或 CNAME 设置域名 DNS，并启用 HTTPS。此包不提供服务商的服务器 IP。修改 DNS 时保留现有邮件 MX、SPF、DKIM 等记录。
6. 上线后检查中英文切换、项目图集、地图、视频、搜索及联系表单。

联系表单
表单通过 FormSubmit 服务发送至 info@nzacg.com。迁移到新域名后可能需要收件邮箱完成激活，请实际提交一条测试咨询并核实邮件到账。此包没有独立邮件服务器，也不包含 SMTP 密码。

外部服务
Google Fonts、Google Maps、YouTube 和 FormSubmit 仍需外部网络连接。YouTube 视频是嵌入播放，不包含本地视频文件；浏览器设置可能限制自动播放。
图片已包含在 images 文件夹内。

保留了全部导出的图片资源，包含少量目前未使用的历史图片，方便后续维护。

English
Extract all files into your hosting document root (public_html or htdocs), with index.html directly at the root. This is a buildless static website, not a WordPress theme. No Node, PHP or database is required. Hash-based navigation needs no special rewrite rules. Configure DNS using the records supplied by your hosting provider and enable HTTPS. Preserve existing mail DNS records. Test FormSubmit email delivery to info@nzacg.com after moving domains; activation may be required. Fonts, maps, YouTube videos and the contact form depend on their external providers.
