import { useMyFetch } from '@/composables/useMyFetch'

export const useDataStore = defineStore('dataStore', {
  state: () => ({
    userToken: null,
    programs: [],
    login: '&admin',
    password: '123456'
  }),

  actions: {
    async getProducts (obj: Object) {
      try {
        const data = await useMyFetch('get-all-mosHolProgramm', {
          method: 'POST'
        })

        if (!data) return

        this.programs = data.programs
      } catch (error) {
        alert(error)
      }
    },
    async addProduct ({ file, body, texts, schedules, gallery }) {
      try {
        let imagePath = ''
        let galleryArray = []

        if (file && file.get('image') != 'undefined') {
          const data = await useMyFetch('upload-mosHolProgrammImage', {
            method: 'POST',
            body: file
          })
          imagePath = data.imagePath[0]
        }

        if (gallery) {
          galleryArray = await useMyFetch('upload-mosHolProgrammImage', {
            method: 'POST',
            body: gallery
          })
        }

        if (!imagePath) return
        body.image = imagePath

        const isProgram = await useMyFetch('add-mosHolProgramm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        })

        if (!isProgram) return

        if (texts.length) {
          const data = await useMyFetch('add-mosHolAboutExcursion', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: isProgram.program.id, texts })
          })
        }

        if (schedules.length) {
          const data = await useMyFetch('add-MosHolSchedule', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: isProgram.program.id, schedules })
          })
        }

        if (galleryArray.imagePath.length) {
          const data = await useMyFetch('add-MosHolGallery', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              id: isProgram.program.id,
              gallery: galleryArray.imagePath
            })
          })
        }

        alert('Успешно добавлено!')
        // useCookie('admin-token').value = data.token
        // this.adminToken = data.token
      } catch (error) {
        alert(error)
      }
    },
    async delProduct (id) {
      try {
        const data = await useMyFetch('delete-mosHolProgramm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id })
        })
      } catch (error) {}
    },
    async updateMosholProgramm ({ formData, file, gallery }) {
      try {
        let imagePath = ''
        let galleryArray = []

        if (file && file.get('image') != 'undefined') {
          const data = await useMyFetch('upload-mosHolProgrammImage', {
            method: 'POST',
            body: file
          })
          imagePath = data.imagePath[0]
        }

        if (gallery) {
          const data = await useMyFetch('upload-mosHolProgrammImage', {
            method: 'POST',
            body: gallery
          })

          galleryArray = data.imagePath
        }

        formData.image = imagePath
        formData.gallery = galleryArray

        const data = await useMyFetch('update-mosHolProgramm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })
      } catch (error) {
        console.log(error)
      }
    },
    async addCinemaParkProgramm ({
      file,
      formData,
      texts,
      schedules,
      locations
    }) {
      try {
        let imagePath = ''

        if (typeof file === 'string') {
          imagePath = file
        } else {
          if (file && file.get('image') != 'undefined') {
            const data = await useMyFetch('upload-mosHolProgrammImage', {
              method: 'POST',
              body: file
            })
            imagePath = data.imagePath[0]
          }  
        }

        if (!imagePath) return
        formData.image = imagePath

        const isProgram = await useMyFetch('add-cinemaParkProgramm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })

        if (!isProgram) return

        if (texts.length) {
          const data = await useMyFetch('add-cinemaParkAboutExcursion', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: isProgram.program.id, texts })
          })
        }

        if (schedules.length) {
          const data = await useMyFetch('add-CinemaParkSchedule', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: isProgram.program.id, schedules })
          })
        }

        
        if (locations.length) {
          for (let i = 0; i < locations.length; i++) {
            if(typeof locations[i].img != 'string') {
              const data = await useMyFetch('upload-mosHolProgrammImage', {
                method: 'POST',
                body: locations[i].imgData
              })
              locations[i].img = data.imagePath[0]
            }
          }
        }

        if (locations.length) {
          const data = await useMyFetch('add-CinemaParkLocations', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              id: isProgram.program.id,
              locations
            })
          })
        }

        alert('Успешно добавлено!')
      } catch (error) {
        console.log(error)
      }
    },
    async getCinemaParkProgramm () {
      try {
        const data = await useMyFetch('get-all-cinemaParkProgramm', {
          method: 'POST'
        })

        if (!data) return

        this.programs = data.programs
      } catch (error) {
        alert(error)
      }
    },
    async delCinemaParkProgramm (id) {
      try {
        const data = await useMyFetch('delete-cinemaParkProgramm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id })
        })
      } catch (error) {}
    },
    async updateCinemaParkProgramm ({ formData, file }) {
      try {
        let imagePath = ''

        if (file && file.get('image') != 'undefined') {
          const data = await useMyFetch('update-cinemaParkProgramm', {
            method: 'POST',
            body: file
          })

          imagePath = data.imagePath[0]
        }

        formData.image = imagePath

        if (
          formData.locations.length &&
          formData.locations.some(el => el.imgData)
        ) {
          for (let i = 0; i < formData.locations.length; i++) {
            const location = formData.locations[i]

            if (location.imgData) {
              const data = await useMyFetch('upload-mosHolProgrammImage', {
                method: 'POST',
                body: location.imgData
              })

              location.img = data.imagePath[0]
            }
          }
        }

        const data = await useMyFetch('update-cinemaParkProgramm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDataStore, import.meta.hot))
}
