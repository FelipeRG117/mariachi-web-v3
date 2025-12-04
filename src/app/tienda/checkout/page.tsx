import CheckoutComponent from "@/components/store/checkoutComponent"

export const metadata = {
  title: "Checkout | Luis Carlos Gago",
  description: "Completa tu compra de forma segura",
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <CheckoutComponent />
    </div>
  )
}
