import { NavbarType } from '@src/enums/NavbarType'
import NavLayout from '@src/layouts/NavLayout'

function ShopHome() {
  return (
    <NavLayout type={NavbarType.SHOP}>
        <div>Shope</div>
    </NavLayout>
  )
}

export default ShopHome