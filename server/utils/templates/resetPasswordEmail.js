const resetPasswordEmail = (name, url) => {
  return `
    <div>
      <p>Hi ${name},</p>
      <p>You requested a password reset.</p>
      <p><a href="${url}">Click here to reset your password</a></p>
      <p>This link will expire in 10 minutes.</p>
    </div>
  `;
};

module.exports = resetPasswordEmail;
