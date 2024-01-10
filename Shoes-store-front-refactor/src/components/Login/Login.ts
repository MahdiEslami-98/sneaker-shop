export const LoginPage = () => {
  return `<div
  id="alert"
  class="absolute -top-96 left-1/2 mb-4 w-4/5 -translate-x-1/2 rounded-lg bg-red-50 p-4 text-sm text-red-800 transition-all"
  role="alert"
></div>
<div class="container mx-auto">
  <div class="w-full pl-6 pt-3">
    <div class="h-8 w-8 cursor-pointer" onclick="navigate('/slider')">
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
  <div class="mx-auto mb-20 mt-12 h-20 w-14">
    <img src="./logo.svg" alt="" class="h-full w-full" />
  </div>
  <p class="text-center text-3xl font-semibold">Log in</p>
  <form class="flex w-full flex-col px-6" id="form">
    <div class="mt-4 flex w-full items-center rounded-sm bg-gray-200">
      <label for="user_name_input" class="pl-3">
        <img src="./icons/person-outline.svg" alt="" class="w-4" />
      </label>
      <input
        type="text"
        class="w-full bg-inherit px-4 py-2 outline-0 border-0"
        placeholder="Username"
        id="user_name_input"
        name="username"
        autocomplete="off"
      />
    </div>
    <div class="mt-4 flex w-full items-center rounded-sm bg-gray-200">
      <label for="pass_input" class="pl-3">
        <img src="./icons/lock-closed-outline.svg" alt="" class="w-4" />
      </label>
      <input
        type="password"
        class="w-full bg-inherit px-4 py-2 outline-0 border-0"
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
    <button
      type="submit"
      class="absolute bottom-4 left-1/2 w-[90%] -translate-x-1/2 rounded-3xl bg-black py-2 text-center font-medium text-white"
    >
      Log in
    </button>
  </form>
  <div class="mt-6 flex w-full items-center justify-center">
    <p class="cursor-pointer text-xl font-medium" id="signup" onclick="navigate('/signup')">Sign up</p>
  </div>
</div>`;
};
