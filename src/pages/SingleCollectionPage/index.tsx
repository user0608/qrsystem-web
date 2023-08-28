import classNames from 'classnames'
import { useParams } from 'react-router-dom'
import { ProcessInAction } from '../../components/loading/ProcessInAction'
import { useFirstClick } from '../../hooks/useFirstClick'
import { useStoredState } from '../../hooks/useStoredState'
import { CollectionSecction } from './CollectionSecction'
import { useSingleCollectionPage } from './hooks/useSingleCollectionPage'
import { TagsSection } from './TagsSection'

const SingleCollectionPage = () => {
  const [tagstate, flushtag] = useFirstClick('tagup')
  const [tagboxState, setTagBoxState] = useStoredState<boolean>('tagbox', false)
  const { collection_id } = useParams<{ collection_id: string }>()
  const { collection, process } = useSingleCollectionPage(collection_id ?? '')

  if (!collection) return <ProcessInAction {...process} size='lg' />
  return (
    <div>
      <div className='md:px-8 px-2 md:py-4 py-2'>
        <div className='flex flex-col md:flex-row w-full gap-4 '>
          <div className='w-full md:h-[400px] relative b-4'>
            <CollectionSecction collection={collection} /* updaterCollection={() => {}} */ />
            <span
              className={classNames(
                'select-none bg-primary text-white text-lg px-2 h-[28px] shadow rounded-l-md absolute bottom-2 md:top-0 right-1 active:right-1',
                { 'animate-bounce': tagstate, hidden: tagboxState }
              )}
              onClick={() => {
                setTagBoxState(true)
                flushtag()
              }}
            >
              Tags
            </span>
          </div>
          <div
            className={classNames('w-full md:h-[400px] h-[300px] transition-all duration-100 overflow-hidden', {
              'md:w-0 h-0 md:h-[400px]': !tagboxState,
            })}
          >
            <TagsSection collectionUuid={collection.id} closeBox={() => setTagBoxState(false)} />
          </div>
        </div>
      </div>
      <div></div>
    </div>
  )
}

export default SingleCollectionPage
