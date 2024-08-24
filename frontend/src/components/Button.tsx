

const Button = (props:any) => {
  return (
    <button className="bg-zinc-800 hover:bg-zinc-700 text-slate-100 hover:text-white font-serif font-semibold py-1 px-2 rounded-md">
      {props.children}
    </button>
  )
}

export default Button
