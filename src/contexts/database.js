import React, {
  createContext,
  useCallback,
  useState
} from 'react'
import PropTypes from 'prop-types'
import firebase from 'services/firebase'

const DatabaseContext = createContext()

const PROFESSIONALS = 'admin/scheduling/professionals'

function DatabaseProvider ({ children }) {
  const db = firebase.firestore()
  const [procedures, setProcedures] = useState(() => [])
  const [professionals, setProfessionals] = useState(() => {})

  const fetchProcedures = useCallback(() => {
    db.collection('admin/scheduling/procedures')
      .get().then(querySnapshot => {
        let procedures = querySnapshot.docs.map(doc => doc.data())
        setProcedures(procedures)
      })
  }, [])

  const fetchProfessionals = useCallback(() => {
    db.collection(PROFESSIONALS)
      .get().then(querySnapshot => {
        let objects = {}
        querySnapshot.forEach(doc => {
          Object.assign(objects, {
            [doc.id]: doc.data()
          })
        })
        setProfessionals(objects)
      })
  }, [])

  const addProfessional = (professional) => {
    const res = db.collection(PROFESSIONALS)
      .add(professional)
      .then((docRef) => {
        return {
          success: true,
          message: 'Profissional adicionado!'
        }
      })
      .catch(function (error) {
        return {
          success: false,
          message: 'Houve um erro.'
        }
      })
    return res
  }

  const updateProfessional = (professional) => {
    let {id, ...professionalWithoutID } = professional
    const professionalRef = db.collection(PROFESSIONALS)
      .doc(id)
    const res = professionalRef.update({
      ...professionalWithoutID
    }).then(() => {
      return {
        success: true,
        message: 'Profissional atualizado!'
      }
    }).catch(function (error) {
        console.log('updateProfessional error', error)
        return {
          success: false,
          message: 'Houve um erro.'
        }
      })

    return res
  }

  return (
    <DatabaseContext.Provider value={{
      procedures,
      fetchProcedures,
      professionals,
      fetchProfessionals,
      addProfessional,
      updateProfessional
    }}
    >
      {children}
    </DatabaseContext.Provider>
  )
}

DatabaseProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export { DatabaseProvider, DatabaseContext }
