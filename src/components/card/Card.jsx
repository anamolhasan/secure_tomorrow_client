import { Link } from 'react-router'

const Card = ({policy}) => {
  // console.log(policy)
  const {image, title, description, _id, category} = policy
  // console.log(_id)
  return (
    <Link
      to={`/policy/${_id}`}
      className='col-span-1 cursor-pointer group shadow-xl p-3 rounded-xl'
    >
      <div className='flex flex-col gap-2 w-full'>
        <div
          className='
              aspect-square 
              w-full 
              relative 
              overflow-hidden 
              rounded-xl
            '
        >
          <img
            className='
                object-cover 
                h-full 
                w-full 
                group-hover:scale-110 
                transition
              '
            src={image}
            alt='Plant Image'
          />
          <div
            className='
              absolute
              top-3
              right-3
            '
          ></div>
        </div>
        <div className='font-semibold text-lg'>{title}</div>
        <div className='font-semibold text-lg'>Category: {category}</div>
       <div className='font-semibold text-sm'>
  {description.length > 80 ? description.slice(0, 80) + "..." : description}
</div>
        <div className='flex flex-row items-center gap-1'>
          <div className='font-semibold'> booking: 15</div>
        </div>
      </div>
    </Link>
  )
}

export default Card
