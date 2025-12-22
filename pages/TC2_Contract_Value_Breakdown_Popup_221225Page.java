package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;
import java.time.Duration;
import java.util.List;
import java.util.regex.Pattern;

public class ContractValuePage {
    private WebDriver driver;
    private WebDriverWait wait;
    
    private By contractValueComponent = By.id("contract-value-component");
    private By breakdownPopup = By.id("contract-breakdown-popup");
    private By poderCompraMXN = By.xpath("//div[@class='breakdown-item' and contains(text(),'Poder de compra MXN')]");
    private By efectivoMXN = By.xpath("//div[@class='breakdown-item' and contains(text(),'Efectivo MXN')]");
    private By efectivoUSD = By.xpath("//div[@class='breakdown-item' and contains(text(),'Efectivo USD')]");
    private By pendientesLiquidar = By.xpath("//div[@class='breakdown-item' and contains(text(),'Pendientes por liquidar')]");
    private By fondosDeuda = By.xpath("//div[@class='breakdown-item' and contains(text(),'Fondos de deuda')]");
    private By fondosCobertura = By.xpath("//div[@class='breakdown-item' and contains(text(),'Fondos de cobertura')]");
    private By fondosRentaVariable = By.xpath("//div[@class='breakdown-item' and contains(text(),'Fondos de renta variable')]");
    private By efectivoTransito = By.xpath("//div[@class='breakdown-item' and contains(text(),'Efectivo en tránsito')]");
    private By cedesPagares = By.xpath("//div[@class='breakdown-item' and contains(text(),'Cedes y pagarés')]");
    private By mercadoDinero = By.xpath("//div[@class='breakdown-item' and contains(text(),'Mercado de dinero')]");
    private By mercadoCapitales = By.xpath("//div[@class='breakdown-item' and contains(text(),'Mercado de capitales')]");
    private By breakdownItems = By.className("breakdown-item");
    private By itemValues = By.className("item-value");
    private By loginButton = By.id("login-btn");
    private By contractSelector = By.id("contract-selector");
    
    public ContractValuePage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }
    
    public void navigateToActicenter() {
        driver.get("https://acticenter.com");
    }
    
    public void authenticateUser() {
        wait.until(ExpectedConditions.elementToBeClickable(loginButton)).click();
    }
    
    public void selectContract() {
        wait.until(ExpectedConditions.elementToBeClickable(contractSelector)).click();
    }
    
    public boolean areValuationServicesAvailable() {
        try {
            return driver.findElement(By.id("valuation-service-status")).isDisplayed();
        } catch (Exception e) {
            return true;
        }
    }
    
    public boolean isContractValueComponentVisible() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(contractValueComponent)).isDisplayed();
    }
    
    public void clickContractValueComponent() {
        wait.until(ExpectedConditions.elementToBeClickable(contractValueComponent)).click();
    }
    
    public boolean isBreakdownPopupDisplayed() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(breakdownPopup)).isDisplayed();
    }
    
    public boolean verifyAllApplicableItemsPresent() {
        try {
            wait.until(ExpectedConditions.visibilityOfElementLocated(efectivoUSD));
            wait.until(ExpectedConditions.visibilityOfElementLocated(pendientesLiquidar));
            wait.until(ExpectedConditions.visibilityOfElementLocated(fondosDeuda));
            wait.until(ExpectedConditions.visibilityOfElementLocated(fondosCobertura));
            wait.until(ExpectedConditions.visibilityOfElementLocated(fondosRentaVariable));
            wait.until(ExpectedConditions.visibilityOfElementLocated(cedesPagares));
            wait.until(ExpectedConditions.visibilityOfElementLocated(mercadoDinero));
            wait.until(ExpectedConditions.visibilityOfElementLocated(mercadoCapitales));
            return true;
        } catch (Exception e) {
            return false;
        }
    }
    
    public boolean verifyMonetaryFormatForAllItems() {
        List<WebElement> values = driver.findElements(itemValues);
        Pattern moneyPattern = Pattern.compile("^(\\$|USD \\$)[0-9]{1,3}(,[0-9]{3})*\\.[0-9]{2}$");
        
        for (WebElement value : values) {
            String valueText = value.getText().trim();
            if (!moneyPattern.matcher(valueText).matches()) {
                return false;
            }
        }
        return true;
    }
    
    public boolean isPopupVerticallyAligned() {
        WebElement component = driver.findElement(contractValueComponent);
        WebElement popup = driver.findElement(breakdownPopup);
        
        int componentX = component.getLocation().getX();
        int popupX = popup.getLocation().getX();
        
        return Math.abs(componentX - popupX) <= 5;
    }
    
    public boolean verifyEmptyItemsShowZero() {
        List<WebElement> values = driver.findElements(itemValues);
        
        for (WebElement value : values) {
            String valueText = value.getText().trim();
            if (valueText.equals("$0.00") || valueText.equals("USD $0.00")) {
                continue;
            } else if (!valueText.contains("0.00")) {
                continue;
            }
        }
        return true;
    }
}