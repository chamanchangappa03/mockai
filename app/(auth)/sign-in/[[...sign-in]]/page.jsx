import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="bg-black dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12 w-full">
        <aside className="relative hidden lg:block lg:col-span-5 xl:col-span-6">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </aside>

        <main className="flex items-center justify-center lg:col-span-7 xl:col-span-6">
          <div className="max-w-xl w-full text-center">
            <h1 className="mb-6 text-2xl font-bold text-yellow-50 sm:text-3xl md:text-4xl dark:text-white">
              Welcome to AI
            </h1>
            <div className="flex justify-center">
              <SignIn routing="hash" />
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}
