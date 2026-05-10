export type MyPageResponse = {
  email: string;
  nickname: string;
  birthDate: string;
  gender: string;
  job: {
    id: string;
    name: string;
  };
  address: {
    id: string;
    name: string;
  };
  createdAt: string;
};

export type EditFormData = {
  nickname: string;
  password?: string;
  confirmPassword?: string;
  jobId: string;
  addressId: string;
};
