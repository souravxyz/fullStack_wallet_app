module.exports = (name, clientUrl) => `
  <div style="font-family: sans-serif; padding: 20px; color: #333;">
    <h2>Welcome, ${name} 👋</h2>
    <p>Thanks for registering with Wallet App!</p>
    <p>You can now securely manage your bank accounts, UPI details, crypto wallets, and more — all in one place.</p>
    <p>To get started, please log in to your account:</p>
    <a href="${clientUrl}/login" style="display: inline-block; background-color: #28a745; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Login to Your Account</a>
    <br><br>
    <p>Welcome aboard!<br>— Wallet App Team</p>
  </div>
`;
