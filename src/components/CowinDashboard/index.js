import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CowinDashboard extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    vaccinationData: {},
  }

  componentDidMount() {
    this.getApiData()
  }

  getApiData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const vaccinationDataApiUrl = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(vaccinationDataApiUrl)
    if (response.ok) {
      const data = await response.json()
      //    console.log(data)
      const updatedData = {
        last7DaysVaccination: data.last_7_days_vaccination.map(item => ({
          vaccinationDate: item.vaccine_date,
          dose1: item.dose_1,
          dose2: item.dose_2,
        })),
        vaccinationByAge: data.vaccination_by_age.map(item => ({
          age: item.age,
          count: item.count,
        })),
        vaccinationByGender: data.vaccination_by_gender.map(item => ({
          count: item.count,
          gender: item.gender,
        })),
      }
      //    console.log(updatedData)
      this.setState({
        apiStatus: apiStatusConstants.success,
        vaccinationData: {
          last7DaysVaccination: updatedData.last7DaysVaccination,
          vaccinationByAge: updatedData.vaccinationByAge,
          vaccinationByGender: updatedData.vaccinationByGender,
        },
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  onSuccessApi = () => {
    const {vaccinationData} = this.state
    //  console.log(vaccinationData)
    return (
      <>
        <VaccinationCoverage
          last7DaysVaccination={vaccinationData.last7DaysVaccination}
        />
        <VaccinationByGender
          VaccinationByGenderDetails={vaccinationData.vaccinationByGender}
        />
        <VaccinationByAge
          VaccinationByAgeDetails={vaccinationData.vaccinationByAge}
        />
      </>
    )
  }

  onFailureApi = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failurePic"
      />
      <h1 className="failureDetails">Something went wrong</h1>
    </>
  )

  renderCoWINData = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.onSuccessApi()
      case apiStatusConstants.failure:
        return this.onFailureApi()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="appContainer">
        <div className="logoContainer">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="logo"
          />
          <h1 className="logoTitle">co-WIN</h1>
        </div>
        <h1 className="heading">CoWIN Vaccination in India</h1>
        <div className="coWINDataContainer">{this.renderCoWINData()}</div>
      </div>
    )
  }
}

export default CowinDashboard
