export const SignupPage = () => {
  return `<div
        id="alert"
        class="w-4/5 absolute left-1/2 -translate-x-1/2 -top-96 transition-all p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
        role="alert"
      ></div>
      <div class="container mx-auto">
        <div class="w-full pl-6 pt-3">
          <div class="w-8 h-8 cursor-pointer" onclick="navigate('/slider')">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="ionicon h-full w-full"
              viewBox="0 0 512 512"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="48"
                d="M244 400L100 256l144-144M120 256h292"
              />
            </svg>
          </div>
        </div>
        <div class="w-14 h-20 mx-auto mt-12 mb-20">
          <img src="./logo.svg" alt="" class="h-full w-full" />
        </div>
        <p class="text-center text-3xl font-semibold">Sign up</p>
        <form class="w-full flex flex-col px-6" id="form">
          <div class="w-full bg-gray-200 flex items-center mt-4 rounded-sm">
            <label for="user_name_input" class="pl-3">
              <img src="./icons/person-outline.svg" alt="" class="w-4" />
            </label>
            <input
              type="text"
              class="bg-inherit px-4 py-2 outline-0 border-0 w-full"
              placeholder="Username"
              id="user_name_input"
              name="username"
              autocomplete="off"
            />
          </div>
          <div class="w-full bg-gray-200 flex items-center mt-4 rounded-sm">
            <label for="pass_input" class="pl-3">
              <img src="./icons/lock-closed-outline.svg" alt="" class="w-4" />
            </label>
            <input
              type="password"
              class="bg-inherit px-4 py-2 outline-0 border-0 w-full"
              placeholder="Password"
              id="pass_input"
              name="password"
            />
            <div class="pr-3">
              <img
                src="./icons/eye-off-outline.svg"
                alt=""
                class="w-4"
                id="show_pass"
              />
            </div>
          </div>
          <div class="w-full bg-gray-200 flex items-center mt-4 rounded-sm">
            <label for="repeat_pass" class="pl-3">
              <img src="./icons/lock-closed-outline.svg" alt="" class="w-4" />
            </label>
            <input
              type="password"
              class="bg-inherit px-4 py-2 outline-0 border-0 w-full"
              placeholder="Repeat Password"
              id="repeat_pass"
              name="repeatPassword"
            />
            <div class="pr-3">
              <img
                src="./icons/eye-off-outline.svg"
                alt=""
                class="w-4"
                id="show_rep_pass"
              />
            </div>
          </div>
          <button
            type="submit"
            class="absolute bottom-4 w-[90%] py-2 text-center bg-black left-1/2 -translate-x-1/2 rounded-3xl text-white font-medium"
          >
            Sign Up
          </button>
        </form>
        <div class="w-full flex justify-center items-center mt-6">
          <p class="text-xl font-medium cursor-pointer" id="login" onclick="navigate('/login')">Log in</p>
        </div>
      </div>`;
};
