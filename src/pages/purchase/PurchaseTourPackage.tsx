import { PackageDataType, getPackageById } from '@src/api/package'
import ErrorPage from '@src/components/ErrorPage'
import PackagePurchaseCard from '@src/components/PackagePurchaseCard';
import AuthNavLayout from '@src/layouts/AuthNavLayout'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom';

const PurchaseTourPackage = () => {
  const { id = "" } = useParams();
  const tourPackage = useQuery<PackageDataType, Error>({
    queryKey: ['package', Number(id)],
    queryFn: () => getPackageById({ id: Number(id) })
  })

  if (tourPackage.isError) {
    return <ErrorPage error={tourPackage.error} />
  }

  return (
    <AuthNavLayout>
      <div className="container mx-auto px-10 pt-5 pb-16">
        {tourPackage.data && (
          <PackagePurchaseCard tour={tourPackage.data.data.tour} tour_package={tourPackage.data.data.tour_package} />
        )}
      </div>
    </AuthNavLayout>
  )
}

export default PurchaseTourPackage