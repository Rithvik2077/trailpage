import Link from "next/link";

const ForgotPassowrdForm = ({ setpassword }) => {
  const handleSubmit = () => {};
  return (
    <div className="mx-auto max-w-[500px] rounded bg-white px-6 py-10 shadow-three dark:bg-dark sm:p-[60px]">
      <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
        Forgot Password
      </h3>
      <p className="mb-11 text-center text-base font-medium text-body-color">
        Enter your registered email
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-8">
          <label
            htmlFor="email"
            className="mb-3 block text-sm text-dark dark:text-white"
          >
            {" "}
            Work Email{" "}
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your Email"
            className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
            required
          />
        </div>

        <div className="mb-6">
          <button className="flex w-full items-center justify-center rounded-sm bg-primary px-9 py-4 text-base font-medium text-white shadow-submit duration-300 hover:bg-primary/90 dark:shadow-submit-dark">
            Send Email
          </button>
        </div>
      </form>
      <p className="text-center text-base font-medium text-body-color">
        Remember your Password? try logging in.{" "}
        <a
          href="#"
          className="text-primary hover:underline"
          onClick={setpassword}
        >
          Sign in
        </a>
      </p>
    </div>
  );
};

export default ForgotPassowrdForm;
