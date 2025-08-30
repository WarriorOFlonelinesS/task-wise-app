export const handleErrors = (e: any) => {
  if (e.status === 500) return 'Oops! Something went wrong';
  const response =
    typeof e.request.response === 'string' ? JSON.parse(e.request.response) : e.request.response;
  return response.message;
};
