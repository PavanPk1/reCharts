import './index.css'
import {BarChart, Bar, XAxis, YAxis, Legend} from 'recharts'

const VaccinationCoverage = props => {
  const {last7DaysVaccination} = props
  console.log(last7DaysVaccination)
  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  return (
    <div className="groupContainer">
      <h1 className="groupHeading">Vaccination Coverage</h1>
      <BarChart
        width={900}
        height={400}
        data={last7DaysVaccination}
        margin={{
          top: 5,
        }}
      >
        <XAxis
          dataKey="vaccinationDate"
          tick={{
            stroke: '#94a3b8',
            strokeWidth: 1,
            fontSize: 15,
            fontFamily: 'Roboto',
          }}
        />
        <YAxis
          tickFormatter={DataFormatter}
          tick={{
            stroke: '#94a3b8',
            strokeWidth: 0.5,
            fontSize: 15,
            fontFamily: 'Roboto',
          }}
        />
        <Legend
          wrapperStyle={{
            padding: 30,
            textAlign: 'center',
            fontSize: 15,
            fontFamily: 'Roboto',
          }}
        />
        <Bar
          dataKey="dose1"
          name="Dose 1"
          fill=" #2d87bb"
          barSize="20%"
          radius={[5, 5, 0, 0]}
        />
        <Bar
          dataKey="dose2"
          name="Dose 2"
          fill=" #f54394"
          barSize="20%"
          radius={[5, 5, 0, 0]}
        />
      </BarChart>
    </div>
  )
}

export default VaccinationCoverage
