const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendEmail(req, res, next) {
  try {
    const { form } = req;

    const date = new Intl.DateTimeFormat("en-GB").format(
      new Date(form.createdAt),
    );

    await transporter.sendMail({
      from: '"Phare Littré" <pharelittre@gmail.com>',
      to: "benjaminaxcell@gmail.com",
      subject: "Signalement harcèlement PHARE Littré",
      html: `
      <table
  role="presentation"
  cellpadding="0"
  cellspacing="0"
  border="0"
  width="100%"
  style="
    border-bottom: 1px solid #e6e6e6;
    padding: 16px;
  "
>
  <tr>
    <td width="60" valign="top">
      <div
        style="
          width: 48px;
          height: 48px;
          line-height: 48px;
          text-align: center;
          border-radius: 50%;
          background-color: ${form.color};
          color: white;
          font-weight: bold;
          font-size: 20px;
        "
      >
        ${form.name[0].toUpperCase()}
      </div>
    </td>

    <td valign="top">
      <div
        style="
          font-size: 18px;
          font-weight: bold;
          color: #000000;
          margin-bottom: 4px;
        "
      >
        ${form.name}
      </div>

      <div
        style="
          font-size: 14px;
          color: #666666;
        "
      >
        ${date}
      </div>
    </td>
  </tr>
</table>

<p
  style="
    color: rgb(141, 141, 141);
    font-weight: 600;
    font-size: 16px;
    margin: 24px 0 12px;
  "
>
  Date de l'incident:
  <span style="color: #000000;">
    ${form.date ? form.date.split("-").join("/") : "N/A"}
  </span>
</p>

<div
  style="
    border-left: 3px solid rgb(141, 141, 141);
    padding-left: 16px;
    margin-top: 24px;
    color: #000000;
    font-size: 16px;
    line-height: 24px;
    margin-bottom: 48px;
  "
>
  ${form.message}
</div>

        <a style='  
        background: none;
        border: none;
        color: rgb(0, 130, 121);
        font-weight: 700;
        font-size: 18px;
        margin-bottom: 24px;
  '
   href="pharelittre.fr">Accéder au Site</a>

`,
    });
    res.status(201).json({ data: form });
  } catch (error) {
    next(error);
  }
}

module.exports = sendEmail;
