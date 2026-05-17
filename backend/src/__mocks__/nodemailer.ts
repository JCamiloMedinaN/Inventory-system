const nodemailerMock = {
  createTransport: (): { sendMail: () => Promise<void> } => ({
    sendMail: async (): Promise<void> => {},
  }),
};
export default nodemailerMock;
