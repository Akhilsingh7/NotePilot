export const successResponse = <T>(
  data: T,
  message = "Success",
  status = 200
) => {
  return Response.json(
    {
      success: true,
      data,
      message,
    },
    {
      status,
    }
  );
};

export const errorResponse = (
  message = "Something went wrong",
  status = 500,
  errors?: any
) => {
  return Response.json(
    {
      success: false,
      message,
      errors,
    },
    { status }
  );
};
