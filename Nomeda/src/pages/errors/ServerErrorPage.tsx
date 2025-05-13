import {ErrorLayout} from '../../components/Layout/ErrorLayout'

export const ServerErrorPage = () => {
  return (
    <ErrorLayout
      code={500}
      title="Server Error"
      message="Something went wrong on our end. We're working to fix it."
    />
  )
}
