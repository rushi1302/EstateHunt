export default function Button({ color, onClick, ...props }) {
  return (
    <button
      type="submit"
      className={`bg-headerThree p-3 rounded-lg text-lg uppercase hover:opacity-80`}
      onClick={onClick}
      {...props}>
      Signin
    </button>
  );
}
