import { Route, Routes } from 'react-router-dom'
import CollectionsPage from '../pages/CollectionsPage'
import SingleCollectionPage from '../pages/SingleCollectionPage'

export const CollectionRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<CollectionsPage />} />
      <Route path='/:collection_id' element={<SingleCollectionPage />} />
    </Routes>
  )
}
