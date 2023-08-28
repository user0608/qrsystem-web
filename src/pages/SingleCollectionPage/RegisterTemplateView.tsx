import { useContext } from 'react'
import { PDF_ICON, QR_IMG } from '../../assets'
import classNames from 'classnames'
import { ModalWrapperContext } from '../../components/modal/ModalWrapper'
import { useRegisterTemplateView } from './hooks/useRegisterTemplateView'

type Props = {
  collectionID: string
  templateDetails?: string
}

export const RegisterTemplateView = ({ collectionID, templateDetails }: Props) => {
  const { form, imageStyles, handleFormSubmit, saving, image, imageblob, handleTestDocument, testing, closemodal } =
    useRegisterTemplateView(collectionID, templateDetails ?? '')
  return (
    <div className='md:px-10 px-2 py-4'>
      <form onSubmit={form.handleSubmit(handleFormSubmit)}>
        <div className='flex justify-between items-end mb-4'>
          <div className='flex flex-col  min-w-[160px]'>
            {imageblob && (
              <>
                <label className='mb-2 text-sm font-medium text-gray-900'>Ancho en milimetros</label>
                <div className='relative flex bg-red-600 text-slate-600'>
                  <input
                    {...form.register('item_width')}
                    type='number'
                    className='px-2 py-[2px] w-full pr-10 outline outline-2 outline-[#DFE1E6] focus:outline-[#4C9AFF] bg-[#FAFBFC] focus:bg-white rounded-md'
                  />
                  <span className='absolute top-0 right-2 font-medium text-slate-500'>mm</span>
                </div>
                <small className='text-xs pl-2 text-slate-500'>
                  Define el ancho que tendrá la tarjeta en el documento A4
                </small>
                <small className='text-xs pl-2 text-rose-500'>{form.errors.item_width?.message}</small>
              </>
            )}
          </div>
          <div className='flex'>
            <div className='inline-block overflow-hidden relative h-8 bg-[#0052CC] active:bg-[#0052CC] hover:bg-[#0065FF] text-white py-1 px-2 rounded-md'>
              <span>Subir imagen</span>
              <input
                type='file'
                accept='image/png, image/jpeg'
                onChange={image.onChange}
                title=''
                className='text-white absolute top-[1px] left-0 opacity-0'
              />
            </div>
          </div>
        </div>

        <div className='flex flex-col items-center w-full bg-gray-200 mb-1 p-2'>
          <div className='overflow-auto relative max-h-[500px] inline-block border-2'>
            <div className='relative'>
              <img
                ref={image.imagebox.imageref}
                onLoad={image.imagebox.onLoad}
                className={classNames('md:w-[400px] xl:w-[500px] bg-blue-500 w-full', { 'h-[200px]': !imageblob })}
              />
              {!imageblob && (
                <div className='w-full h-full absolute top-0 left-0 flex flex-col justify-center items-center text-white'>
                  <p className='text-2xl font-bold'>No hay Imagen</p>
                  <p>Suba una imagen, con el diseño para su ticket</p>
                </div>
              )}
            </div>
            {imageblob && <img src={QR_IMG} style={imageStyles()} className='bg-blue-500 shadow z-10' />}
          </div>
        </div>
        <div className='mb-3 flex justify-between'>
          <div className='w-[80%]'>{/* <ProcessInAction {...pruebaProcess} /> */}</div>
          <div className='w-[120px]'>
            {imageblob && (
              <button
                disabled={testing}
                type='button'
                className='bg-green-500 active:bg-green-500 hover:bg-green-600 text-white px-2 py-[2px] rounded-md disabled:bg-gray-400'
                onClick={() => handleTestDocument()}
              >
                <span>Probar</span>
                <img src={PDF_ICON} alt='pdf' className='inline w-5 ml-2 pb-[1px]' />
              </button>
            )}
          </div>
        </div>
        {imageblob && (
          <div>
            <div className='flex gap-x-4 gap-y-2 flex-wrap'>
              <div className='flex flex-col  w-[160px]'>
                <label className='mb-2 text-sm font-medium text-gray-900'>Qr Size</label>
                <input
                  min={0}
                  {...form.register('qr_size')}
                  type='number'
                  className='text-slate-600 px-2 py-[2px] outline outline-2 outline-[#DFE1E6] focus:outline-[#4C9AFF] bg-[#FAFBFC] focus:bg-white rounded-md'
                />
                <small className='text-xs pl-2 text-rose-500'>{form.errors.qr_size?.message}</small>
              </div>
              <div className='flex flex-col  w-[160px]'>
                <label className='mb-2 text-sm font-medium text-gray-900'>Qr posición X</label>
                <input
                  min={0}
                  {...form.register('qr_x')}
                  type='number'
                  className='text-gray-600 px-2 py-[2px] outline outline-2 outline-[#DFE1E6] focus:outline-[#4C9AFF] bg-[#FAFBFC] focus:bg-white rounded-md'
                />
                <small className='text-xs pl-2 text-rose-500'>{form.errors.qr_x?.message}</small>
              </div>
              <div className='flex flex-col  w-[160px] mb-8'>
                <label className='mb-2 text-sm font-medium text-gray-900'>Qr posición Y</label>
                <input
                  min={0}
                  {...form.register('qr_y')}
                  type='number'
                  className='text-gray-600 px-2 py-[2px] outline outline-2 outline-[#DFE1E6] focus:outline-[#4C9AFF] bg-[#FAFBFC] focus:bg-white rounded-md'
                />
                <small className='text-xs pl-2 text-rose-500'>{form.errors.qr_y?.message}</small>
              </div>
            </div>
            <div className='flex justify-between'>
              <button className='btn-red-sm' onClick={closemodal}>
                {saving ? 'Cerrar' : 'Cancel'}
              </button>
              <button className='btn-primary disabled:bg-gray-400' disabled={saving}>
                Guardar
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}
