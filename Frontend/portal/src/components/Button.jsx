export default function Button({Name, fun}) {
  return (
    <button onClick={fun} className='bg-[#5E469C] hover:bg-[rgb(0,0,0)] border-[#8C5FFF] text-white p-[0.2rem_1rem] rounded-md'>
        {Name}
    </button>
  )
}
