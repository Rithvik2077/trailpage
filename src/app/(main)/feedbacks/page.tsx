import React from "react";

function Feedbacks() {
  // let feedback: string | number | readonly string[] | undefined;
  // const handleSubmit = (event: { preventDefault: () => void; }) => {
  //   // event.preventDefault();
  //   // Here you can send the feedback data to your backend or perform any other actions
  //   console.log('Feedback submitted:', feedback);
  //   // Optionally, you can clear the feedback field after submission

  // };

  return (
    <div>
      <section>
        <div className="container ">
          <div className="flex w-full flex-wrap px-4">
            <div className="mx-auto max-w-[700px] rounded bg-white px-6 py-10 text-center shadow-three dark:bg-dark sm:p-[60px]">
              <h2 className="mb-3 text-3xl font-bold text-black">
                Feedback form
              </h2>
              <p className="text-sm">We value your feedback!</p>

              <form action="" className="mt-5 text-start">
                <input
                  type="text"
                  name="title"
                  placeholder="Enter the title"
                  className="w-full rounded-md border-2 p-2"
                />

                <textarea
                  name="feedback"
                  id="feedback"
                  cols={30}
                  rows={10}
                  className="mt-4 w-full rounded-md border-2 p-2"
                  placeholder="Feedback"
                ></textarea>
                <div className="text-center">
                  <button className="mx-auto rounded-md bg-red-600 p-1 px-3 text-white">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/* <h2 className="bold text-3xl ps-10 pt-6">Feedback Form</h2> */}
        </div>
      </section>
    </div>
  );
}

export default Feedbacks;
