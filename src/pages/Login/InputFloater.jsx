import React from 'react'

const InputFloater = ({name, value, handleChange,label, elementClass, type, disabled}) => {
  return (
    <div className={`relative ${elementClass}`}>
      <input
        type={type}
        className="block rounded-t-lg rounded-b-lg focus:rounded-b-none px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 
        bg-gray-50 hover:bg-gray-100
        dark:bg-gray-700 border-0 border-b-2 
        border-gray-300 appearance-none dark:text-white dark:border-gray-600 
        dark:focus:border-blue-500 focus:outline-none focus:ring-0 
        focus:border-blue-800 peer
        transition-all duration-200 ease-in-out
        "
        id={name}
        placeholder=" "
        value={ value }
        onChange={ handleChange }
        name={ name }
        disabled={disabled}
      />
      <label
        htmlFor={name}
        className="absolute text-sm font-semibold text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-800 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">{label}</label>
</div>
  )
}

export default InputFloater