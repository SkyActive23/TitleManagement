import RegisterForm from '../../components/RegisterForm';

export default function RegisterPage() {
  return (
    <main className="w-full max-w-md mx-auto p-6 bg-gradient-to-r from-gray-900 to-gray-700 rounded-lg shadow-lg">
      {/* <h1 className="text-2xl font-bold text-center text-neutral mb-6">Register</h1> */}
      <RegisterForm />
    </main>
  );
}
