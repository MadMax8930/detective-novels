import Link from 'next/link'
import Image from 'next/image'
import { NoItemProps } from '@/types'

const NoItem: React.FC<NoItemProps> = ({ variation, title, description, imageSrc, imageAlt, linkHref }) => {
  return (
    <div className={`${variation}Container`}>
      <Link href={linkHref} className={`${variation}Link`}>
        <h1 className={`${variation}Title`}>{title}</h1>
        <p className={`${variation}Description`}>{description}</p>
        <Image className={`${variation}Image`} src={imageSrc} width={100} height={100} alt={imageAlt} />
      </Link>
    </div>
  )
}

export default NoItem