import 'dotenv/config'
import cds from '@sap/cds'

export default cds.service.impl(async function () {

    const { Orders } = this.entities

    this.before('CREATE', Orders, async (req) => {

        console.log('========== INICIO CREATE ==========')

        const order = req.data

        console.log('Pedido recebido:')
        console.log(order)

        const access_token = process.env.ACCESS_TOKEN
        const api_key= process.env.API_KEY

        if (!access_token) {
            throw new Error('ACCESS_TOKEN não encontrado no .env')
        }

        if(!api_key) {
            throw new Error('API_KEY não encontrada no .env')
        }

        const response = await fetch(
            'https://f7e61906trial-trial.integrationsuitetrial-apim.us10.hana.ondemand.com:443/f7e61906trial/order',
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                    'apikey' : api_key,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    customer: order.customer,
                    amount: Number(order.amount)
                })
            }
        )

        console.log('Status retornado pelo APIM:', response.status)

        if (!response.ok) {

            const errorBody = await response.text()

            console.error('Erro retornado pelo APIM:')
            console.error(errorBody)

            throw new Error(
                `Erro no APIM/iFlow (${response.status}): ${errorBody}`
            )
        }

        const result = await response.json()

        console.log('Resposta do APIM/iFlow:')
        console.log(JSON.stringify(result, null, 2))

        req.data.status = result.status

        console.log('========== FIM CREATE ==========')
    })
    this.after('READ', Orders, (orders) => {

    const rows = Array.isArray(orders)
        ? orders
        : [orders]

    rows.forEach(order => {

        if (!order) return

        switch (order.status) {

            case 'APROVADO':
                order.criticality = 3
                break

            case 'PENDENTE':
                order.criticality = 2
                break

            default:
                order.criticality = 0
        }
    })
})
})