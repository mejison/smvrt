export default function Toggle({ index, value, handleChange }) {
    return (<label className="relative inline-flex peer-focus:outline-none items-center cursor-pointer">
                <input 
                    id={index}
                    type="checkbox" 
                    value={value.value} 
                    checked={value.value} 
                    onChange={handleChange} 
                    className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#4BA3F5]"></div>
            </label>);
}