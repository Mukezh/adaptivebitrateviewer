export const Button = ({ props, type }) => {
  console.log(type);
  return (
    <div className="border min-h-18 max-w-48 p-4 rounded-lg bg-[#E6C691] font-serif hover:cursor-pointer hover:text-[#F2EFCE] transition-transform duration-300 hover:scale-125">
      {props}
    </div>
  );
};
