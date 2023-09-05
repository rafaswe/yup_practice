"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  firstname: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required("Enter a valid email"),
  phone: yup
    .string()
    .test("is-zero-start", "Must start with zero", function (value) {
      if (!value || value.charAt(0) === "0") {
        return true;
      }
      return false;
    })
    .test("length", "Minimum 8 digit is needed", function (value) {
      if (!value) {
        return true; // Let the "required" validation handle the absence of a value
      }
      const numericValue = value.replace(/\D/g, ""); // Remove non-digit characters
      return numericValue.length >= 8;
    })
    .test("length", "Maximum 11 character will be allowed", function (value) {
      if (!value) {
        return true; // Let the "required" validation handle the absence of a value
      }
      const numericValue = value.replace(/\D/g, ""); // Remove non-digit characters
      return numericValue.length <= 11;
    })
    .required("Phone number is required"),

  age: yup
    .number()
    .typeError("Age should be a number")
    .positive()
    .integer()
    .required("Please Enter Valid Number"),
  password: yup
    .string()
    .required()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/,
      "Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special characte"
    ),
  //   confirmPassword: yup
  //     .string()
  //     .when("password", (password, field) =>
  //       password ? field.required().oneOf([yup.ref("password")]) : field
  //     ),
  confirmPassword: yup
    .string()
    .required("Enter a valid password")
    .oneOf([yup.ref("password")], "Password Should be matched"),
});

type UserType = yup.InferType<typeof schema>;

const MyForm = () => {
  const [data, setData] = useState<UserType>();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    reset();
    setData(data);
  };
  console.log(typeof data);

  return (
    <div className="form">
      <h1>My Hook Form</h1>
      <hr />
      <form onSubmit={handleSubmit(onSubmit)} className="form-body">
        <div className="col-6">
          <label>First Name</label>
          <input type="text" {...register("firstname")} />
          <p className="error-message">{errors.firstname?.message}</p>
        </div>
        <div className="col-6">
          <label>Last Name</label>
          <input type="text" {...register("lastName")} />
          <p className="error-message">{errors.lastName?.message}</p>
        </div>
        <div className="col-6">
          <label>Email</label>
          <input type="text" {...register("email")} />
          <p>{errors.email?.message}</p>
        </div>
        <div className="col-6">
          <label>Phone</label>
          <input type="text" {...register("phone")} />
          <p>{errors.phone?.message}</p>
        </div>
        <div className="col-6">
          <label>Age</label>
          <input type="number" {...register("age")} />
          <p>{errors.age?.message}</p>
        </div>
        <div className="col-6">
          <label>Password</label>
          <input type="password" {...register("password")} />
          <p>{errors.password?.message}</p>
        </div>
        <div className="col-6">
          <label>Confirm Password</label>
          <input type="password" {...register("confirmPassword")} />
          <p>{errors.confirmPassword?.message}</p>
        </div>

        <input id="button" type="submit" />
      </form>
    </div>
  );
};

export default MyForm;
