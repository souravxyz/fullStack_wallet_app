const endpoints = {
  auth: {
    register: "/auth/register",
    login: "/auth/login",
    profile: "/auth/profile",
    forgotPassword: "/auth/forgot-password",
    resetPassword: (token) => `/auth/reset-password/${token}`,
    changePassword: "/auth/change-password",
    logout: "/auth/logout",
  },
  wallet: {
    create: "/wallet",
    list: "/wallet",
    delete: (id) => `/wallet/${id}`,
  },
  notes: {
    create: "/notes",
    list: "/notes",
    delete: (id) => `/notes/${id}`,
  },
  family: {
    create: "/family",
    list: "/family",
    addWallet: (id) => `/family/${id}/wallet`,
    deleteWallet: (id) => `/family/${id}/wallet`,
    delete: (id) => `/family/${id}`,
  },
};

export default endpoints;
