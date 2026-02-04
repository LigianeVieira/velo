import {test, expect} from "@playwright/test";

/// AAA - Arrange, Act, Assert

const ORDER_NUMBER = 'VLO-R083QG'
const CSS_SELECTORRESULT_CARD = `.rounded-lg:has-text("Pedido"):has-text("${ORDER_NUMBER}")`
const ID_ORDERRESULT_CARD = `order-result-${ORDER_NUMBER}`
const ID_HERO_SECTION = 'hero-section'
const CONSULTARPEDIDO = 'Consultar Pedido'
const APROVADO = 'APROVADO'
const BASE_URL = 'http://localhost:5173/'


test.describe('Pedidos Velô Sprint', { tag: ['@PEDIDOSVELO'] }, () => {


test('01 - Deve consultar um pedido aprovado', async ({ page }) => {
// Locators
const locatorResultCard = page.locator(CSS_SELECTORRESULT_CARD)
const locatorVeloSprintHeading = page.getByTestId(ID_HERO_SECTION).getByRole('heading')
const locatorOrderLink = page.getByRole('link', { name: CONSULTARPEDIDO })
const locatorSearchOrderTextbox = page.getByRole('textbox', { name: 'Número do Pedido' })
const locatorSearchOrderButton = page.getByRole('button', { name: 'Buscar Pedido' }) 
const locatorConsultarPedidoHeading = page.getByRole('heading', { name: CONSULTARPEDIDO })
const locatorOrderNumberText = page.getByText(ORDER_NUMBER)
const locatorOrderResultCard = page.getByTestId(ID_ORDERRESULT_CARD)
const locatorOrderApprovedText = page.getByText(APROVADO);

    // Arrange
    await page.goto(BASE_URL)
    await expect(locatorVeloSprintHeading).toContainText('Velô Sprint')
    await locatorOrderLink.click()
    await expect(locatorConsultarPedidoHeading).toContainText(CONSULTARPEDIDO)

    // Act
    await locatorSearchOrderTextbox.fill(ORDER_NUMBER)
    await locatorSearchOrderButton.click()

    // Assert
    await expect(locatorOrderNumberText).toBeVisible({timeout: 10_000})
     // 1ª forma usando Css selector com has-text
    await expect(locatorResultCard).toContainText(ORDER_NUMBER)
    // 2ª forma usando data-testid do card de resultado
    await expect(locatorOrderResultCard).toContainText(ORDER_NUMBER)

    await expect(locatorOrderApprovedText).toBeVisible()
    // 1ª forma usando Css selector com has-text
    await expect(locatorResultCard).toContainText(APROVADO)
    // 2ª forma usando data-testid do card de resultado
    await expect(locatorOrderResultCard).toContainText(APROVADO)
 
})
})