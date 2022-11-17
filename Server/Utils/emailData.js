export const emailData = (email, token) => ({
  from: "borusessayeh@gmail.com",
  to: email,
  subject: "Password reset from Electronica",
  template: "passwordreset",
  'h:X-Mailgun-Variables': { resetLink: `${process.env.URL_CLIENT}/reset-password/${token}` }
});
