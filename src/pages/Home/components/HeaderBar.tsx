import { Link } from 'react-router-dom'

export const HeaderBar = () => {
  return (
    <div className='h-10 bg-gray-100 flex justify-end items-center px-5'>
      <Link to='collections' className='btn-sm rounded-md h-7'>
        Empezar
      </Link>
    </div>
  )
}
