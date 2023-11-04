import { expect, test } from 'vitest'
import { serialize } from './serialize'

test('flatten', () => {
  const metaData = {
    og: {
      locale: [
        'en_GB',
        {
          alternate: ['fr_FR', 'es_ES']
        }
      ],
      image: [
        {
          '': 'https://example.com/image.jpg',
          width: '300',
          height: '400'
        },
        'https://example.com/image-2.jpg',
        {
          '': 'https://example.com/image-3.jpg',
          height: '1000'
        }
      ]
    }
  }

  const converted = serialize(metaData)

  expect(converted).toStrictEqual([
    ['og:locale', 'en_GB'],
    ['og:locale:alternate', 'fr_FR'],
    ['og:locale:alternate', 'es_ES'],
    ['og:image', 'https://example.com/image.jpg'],
    ['og:image:width', '300'],
    ['og:image:height', '400'],
    ['og:image', 'https://example.com/image-2.jpg'],
    ['og:image', 'https://example.com/image-3.jpg'],
    ['og:image:height', '1000']
  ])
})
