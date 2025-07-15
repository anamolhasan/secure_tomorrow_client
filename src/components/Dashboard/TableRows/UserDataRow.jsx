import { useState } from "react"
import UpdateUserRoleModal from "../../Modal/UpdateUserRoleModal"

const UserDataRow = ({user}) => {
  const {email, role, status, name, created_at} = user
  const [isOpen, setIsOpen] = useState(false)
  console.log(user)
  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
       <p className='text-gray-900 whitespace-no-wrap'>{name}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
       <p className='text-gray-900 whitespace-no-wrap'>{email}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{role}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'> {new Date(created_at).toLocaleDateString()}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p
          className={`${
            status === 'requested'
              ? 'text-yellow-500'
              : status === 'verified'
              ? 'text-green-500'
              : 'text-red-500'
          } whitespace-no-wrap`}
        >
          {status ? status : 'Unavailable'}
        </p>
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        {role === "admin" ? (
  <span
    className="relative inline-block px-3 py-1 font-semibold text-gray-500 leading-tight cursor-not-allowed"
    title="Admin role cannot be changed"
  >
    <span
      aria-hidden="true"
      className="absolute inset-0 bg-gray-300 opacity-50 rounded-full"
    ></span>
    <span className="relative">Update Role</span>
  </span>
) : (
  <span
    onClick={() => setIsOpen(true)}
    className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
  >
    <span
      aria-hidden="true"
      className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
    ></span>
    <span className="relative">Update Role</span>
  </span>
)}

        {/* Modal */}
        <UpdateUserRoleModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          role={role}
          userEmail={email}
        />
      </td>
    </tr>
  )
}

export default UserDataRow
