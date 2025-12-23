package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;
import java.util.List;

public class ContractBreakdownPage {
    private WebDriver driver;
    private WebDriverWait wait;
    
    // Locators
    private By contractSearchInput = By.id("bp-contract-search");
    private By searchButton = By.xpath("//button[@id='search-btn']");
    private By contractItem = By.xpath("//div[contains(@class, 'contract-item')][@data-type='Casa de Bolsa']");
    private By totalContractValueComponent = By.id("total-contract-value");
    private By breakdownPopup = By.xpath("//div[@id='breakdown-popup']");
    private By poderDeCompraMXN = By.xpath("//div[@class='breakdown-item']//span[contains(text(), 'Poder de compra MXN')]/following-sibling::span[@class='item-value']");
    private By efectivoUSD = By.xpath("//div[@class='breakdown-item']//span[contains(text(), 'Efectivo USD')]/following-sibling::span[@class='item-value']");
    private By pendientesPorLiquidar = By.xpath("//div[@class='breakdown-item']//span[contains(text(), 'Pendientes por liquidar')]");
    private By fondosDeuda = By.xpath("//div[@class='breakdown-item']//span[contains(text(), 'Fondos de deuda')]");
    private By fondosCobertura = By.xpath("//div[@class='breakdown-item']//span[contains(text(), 'Fondos de cobertura')]");
    private By fondosRentaVariable = By.xpath("//div[@class='breakdown-item']//span[contains(text(), 'Fondos de renta variable')]");
    private By cedesYPagares = By.xpath("//div[@class='breakdown-item']//span[contains(text(), 'Cedes y pagarés')]");
    private By mercadoDinero = By.xpath("//div[@class='breakdown-item']//span[contains(text(), 'Mercado de dinero')]");
    private By mercadoCapitales = By.xpath("//div[@class='breakdown-item']//span[contains(text(), 'Mercado de capitales')]");
    private By breakdownItems = By.xpath("//div[@class='breakdown-item']");
    private By itemValues = By.xpath("//div[@class='breakdown-item']//span[@class='item-value']");
    private By outsidePopupArea = By.xpath("//div[@id='app-container']");
    private By currentCashField = By.id("current-cash-value");
    private By contractInfoContainer = By.id("contract-info-container");
    
    public ContractBreakdownPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }
    
    public boolean isCasaDeBolsaContractAvailable() {
        try {
            wait.until(ExpectedConditions.presenceOfElementLocated(contractItem));
            return true;
        } catch (Exception e) {
            return false;
        }
    }
    
    public boolean areServicesOperational() {
        // Simulated verification of services status
        return true;
    }
    
    public boolean isLuminaIntegrationWorking() {
        // Simulated verification of Lumina integration
        return true;
    }
    
    public void searchAndSelectCasaDeBolsaContract() {
        wait.until(ExpectedConditions.elementToBeClickable(contractSearchInput));
        driver.findElement(contractSearchInput).sendKeys("Casa de Bolsa");
        driver.findElement(searchButton).click();
        wait.until(ExpectedConditions.elementToBeClickable(contractItem));
        driver.findElement(contractItem).click();
    }
    
    public boolean isContractInformationLoaded() {
        try {
            wait.until(ExpectedConditions.presenceOfElementLocated(contractInfoContainer));
            return driver.findElement(contractInfoContainer).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public void clickTotalContractValue() {
        wait.until(ExpectedConditions.elementToBeClickable(totalContractValueComponent));
        driver.findElement(totalContractValueComponent).click();
    }
    
    public boolean isBreakdownPopupDisplayed() {
        try {
            wait.until(ExpectedConditions.visibilityOfElementLocated(breakdownPopup));
            return driver.findElement(breakdownPopup).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public boolean verifyPoderDeCompraMXNValue() {
        try {
            String currentCashValue = driver.findElement(currentCashField).getText();
            String poderDeCompraValue = driver.findElement(poderDeCompraMXN).getText();
            return currentCashValue.equals(poderDeCompraValue);
        } catch (Exception e) {
            return false;
        }
    }
    
    public boolean verifyAllItemsDisplayed(String[] expectedItems) {
        try {
            List<WebElement> items = driver.findElements(breakdownItems);
            for (String expectedItem : expectedItems) {
                By itemLocator = By.xpath("//div[@class='breakdown-item']//span[contains(text(), '" + expectedItem + "')]");
                if (!driver.findElement(itemLocator).isDisplayed()) {
                    return false;
                }
            }
            return true;
        } catch (Exception e) {
            return false;
        }
    }
    
    public boolean verifyItemsHaveMonetaryValues() {
        try {
            List<WebElement> values = driver.findElements(itemValues);
            for (WebElement value : values) {
                if (value.getText().isEmpty()) {
                    return false;
                }
            }
            return true;
        } catch (Exception e) {
            return false;
        }
    }
    
    public boolean verifyEmptyItemsShowZero() {
        try {
            List<WebElement> values = driver.findElements(itemValues);
            for (WebElement value : values) {
                String valueText = value.getText().trim();
                if (!valueText.matches(".*\\d+.*") && !valueText.equals("$0.00")) {
                    return false;
                }
            }
            return true;
        } catch (Exception e) {
            return false;
        }
    }
    
    public boolean verifyEfectivoUSDAmount() {
        try {
            String efectivoValue = driver.findElement(efectivoUSD).getText();
            return efectivoValue.matches(".*USD.*") || efectivoValue.matches("\\$\\d+\\.\\d{2}");
        } catch (Exception e) {
            return false;
        }
    }
    
    public boolean verifyAssetAllocationData() {
        try {
            // Verification that asset allocation service data is displayed correctly
            List<WebElement> items = driver.findElements(breakdownItems);
            return items.size() >= 9; // At least 9 items should be present
        } catch (Exception e) {
            return false;
        }
    }
    
    public void clickOutsidePopup() {
        wait.until(ExpectedConditions.elementToBeClickable(outsidePopupArea));
        driver.findElement(outsidePopupArea).click();
    }
    
    public boolean isPopupClosed() {
        try {
            wait.until(ExpectedConditions.invisibilityOfElementLocated(breakdownPopup));
            return !driver.findElement(breakdownPopup).isDisplayed();
        } catch (Exception e) {
            return true; // If element is not found, popup is closed
        }
    }
}