import { DotsVerticalIcon } from '@heroicons/react/outline'
import moment from 'moment'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { DropDown } from '../../components/dropdown/DropDown'
import { SearchInput } from '../../components/form/SearchInput'
import { ProcessWrapper } from '../../components/loading/ProcessWrapper'
import { ModalWrapper } from '../../components/modal/ModalWrapper'
import { useAlerta } from '../../hooks/useAlerta'
import { useModal } from '../../hooks/useModal'
import { Collection } from '../../models/collection'
import { CollectionRegisterView } from './CollectionRegisterView'
import { useCollectionPage } from './hooks/useCollectionPage'

const CollectionsPage = () => {
  const alerta = useAlerta()
  const [modalState, openModal] = useModal()
  const { collections, process, handlerDelete } = useCollectionPage()
  const refCollection = useRef<Collection | undefined>(undefined)
  return (
    <div className='container mx-auto p-4'>
      <ModalWrapper title='Nueva Collection' modalState={modalState} allowOutside>
        <CollectionRegisterView collection={refCollection.current} />
      </ModalWrapper>
      <div className='mb-2'>
        <div className='flex justify-between mb-5'>
          <p className='text-2xl font-semibold'>Collections</p>
          <div>
            <button
              className='bg-[#0052CC] active:bg-[#0052CC] hover:bg-[#0065FF] text-white py-1 px-2 rounded-md'
              onClick={() => {
                refCollection.current = undefined
                openModal()
              }}
            >
              Crear nuevo
            </button>
          </div>
        </div>
        <SearchInput />
      </div>
      <ProcessWrapper {...process}>
        <div className='overflow-x-auto relative pb-28'>
          <table className='w-full text-sm text-left text-gray-500'>
            <thead className='text-xs text-gray-700 border-b-2'>
              <tr>
                <th scope='col' className='py-3 px-6'>
                  Nombre Colección
                </th>
                <th scope='col' className='py-3 px-6'>
                  Creado En
                </th>
                <th scope='col' className='py-3 px-6'>
                  Valido Desde
                </th>
                <th scope='col' className='py-3 px-6'>
                  Valido Hasta
                </th>
                <th scope='col' className='py-3 px-6'>
                  Num Tickets
                </th>
                <th scope='col' className='py-3 px-6'>
                  Action
                </th>
              </tr>
            </thead>
            <tbody className='border-b-2'>
              {collections?.map(c => (
                <tr key={c.id} className='bg-white hover:bg-gray-50'>
                  <th
                    scope='row'
                    className='py-1 px-6 font-medium  whitespace-nowrap text-[#0065FF] hover:text-[#0065FF] hover:underline'
                  >
                    <Link to={c.id}>{c.name}</Link>
                  </th>
                  <td className='py-1 px-6 whitespace-nowrap'>{moment(c.created_at).format('LL')}</td>
                  <td className='py-1 px-6 whitespace-nowrap'>{moment(c.not_before).format('LLL')}</td>
                  <td className='py-1 px-6 whitespace-nowrap'>
                    {c.time_out ? moment(c.time_out).format('LL') : 'no limite'}
                  </td>
                  <td className='py-1 px-6  whitespace-nowrap'>{c.num_tickets}</td>
                  <td className='px-6'>
                    <DropDown
                      options={['Editar', 'Descripcion', 'Eliminar']}
                      onSelect={op => {
                        switch (op) {
                          case 'Editar':
                            refCollection.current = { ...c }
                            openModal()
                            break
                          case 'Descripcion':
                            alerta(c.description || 'no hay descripción')
                            break
                          case 'Eliminar':
                            handlerDelete(c.id)
                            break
                        }
                      }}
                    >
                      <div>
                        <DotsVerticalIcon className='w-6 mx-auto rotate-90' />
                      </div>
                    </DropDown>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ProcessWrapper>
    </div>
  )
}

export default CollectionsPage
