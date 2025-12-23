package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;
import java.util.List;

public class ContractValueBreakdownPage {
    private WebDriver driver;
    private WebDriverWait wait;
    
    private By breakdownPopup = By.id("contractValueBreakdownPopup");
    private By purchasingPowerMXN = By.xpath("//div[@class='breakdown-item']//span[contains(text(),'Poder de compra MXN')]/parent::div");
    private By cashUSD = By.xpath("//div[@class='breakdown-item']//span[contains(text(),'Efectivo USD')]/parent::div");
    private By pendingSettlement = By.xpath("//div[@class='breakdown-item']//span[contains(text(),'Pendientes por liquidar')]/parent::div");
    private By debtFunds = By.xpath("//div[@class='breakdown-item']//span[contains(text(),'Fondos de deuda')]/parent::div");
    private By hedgeFunds = By.xpath("//div[@class='breakdown-item']//span[contains(text(),'Fondos de cobertura')]/parent::div");
    private By variableIncomeFunds = By.xpath("//div[@class='breakdown-item']//span[contains(text(),'Fondos de renta variable')]/parent::div");
    private By certificatesAndNotes = By.xpath("//div[@class='breakdown-item']//span[contains(text(),'Cedes y pagarés')]/parent::div");
    private By moneyMarket = By.xpath("//div[@class='breakdown-item']//span[contains(text(),'Mercado de dinero')]/parent::div");
    private By capitalMarket = By.xpath("//div[@class='breakdown-item']//span[contains(text(),'Mercado de capitales')]/parent::div");
    private By breakdownItems = By.className("breakdown-item");
    private By breakdownList = By.id("breakdownList");
    private By totalValueComponent = By.id("totalContractValue");
    
    public ContractValueBreakdownPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }
    
    public boolean isBreakdownPopupDisplayed() {
        try {
            wait.until(ExpectedConditions.visibilityOfElementLocated(breakdownPopup));
            return driver.findElement(breakdownPopup).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public boolean isItemDisplayed(String itemName) {
        By itemLocator = getLocatorByItemName(itemName);
        try {
            wait.until(ExpectedConditions.visibilityOfElementLocated(itemLocator));
            return driver.findElement(itemLocator).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public String getItemValue(String itemName) {
        By itemLocator = getLocatorByItemName(itemName);
        try {
            WebElement item = wait.until(ExpectedConditions.visibilityOfElementLocated(itemLocator));
            WebElement valueElement = item.findElement(By.className("item-value"));
            return valueElement.getText();
        } catch (Exception e) {
            return null;
        }
    }
    
    public boolean isItemValueRightAligned(String itemName) {
        By itemLocator = getLocatorByItemName(itemName);
        try {
            WebElement item = driver.findElement(itemLocator);
            WebElement valueElement = item.findElement(By.className("item-value"));
            String textAlign = valueElement.getCssValue("text-align");
            return "right".equals(textAlign) || "end".equals(textAlign);
        } catch (Exception e) {
            return false;
        }
    }
    
    public boolean verifyZeroValueItems(String expectedValue) {
        try {
            List<WebElement> items = driver.findElements(breakdownItems);
            for (WebElement item : items) {
                WebElement valueElement = item.findElement(By.className("item-value"));
                String value = valueElement.getText().trim();
                if (value.isEmpty() || value.equals("0") || value.equals("0.00")) {
                    if (!value.equals(expectedValue)) {
                        return false;
                    }
                }
            }
            return true;
        } catch (Exception e) {
            return false;
        }
    }
    
    public boolean isBreakdownListVerticallyAligned() {
        try {
            WebElement list = driver.findElement(breakdownList);
            WebElement totalValue = driver.findElement(totalValueComponent);
            int listX = list.getLocation().getX();
            int totalValueX = totalValue.getLocation().getX();
            return Math.abs(listX - totalValueX) <= 5;
        } catch (Exception e) {
            return false;
        }
    }
    
    private By getLocatorByItemName(String itemName) {
        switch (itemName) {
            case "Purchasing Power MXN":
            case "Poder de compra MXN":
                return purchasingPowerMXN;
            case "Cash USD":
            case "Efectivo USD":
                return cashUSD;
            case "Pending Settlement":
            case "Pendientes por liquidar":
                return pendingSettlement;
            case "Debt Funds":
            case "Fondos de deuda":
                return debtFunds;
            case "Hedge Funds":
            case "Fondos de cobertura":
                return hedgeFunds;
            case "Variable Income Funds":
            case "Fondos de renta variable":
                return variableIncomeFunds;
            case "Certificates and Promissory Notes":
            case "Cedes y pagarés":
                return certificatesAndNotes;
            case "Money Market":
            case "Mercado de dinero":
                return moneyMarket;
            case "Capital Market":
            case "Mercado de capitales":
                return capitalMarket;
            default:
                return By.xpath("//div[@class='breakdown-item']//span[contains(text(),'" + itemName + "')]/parent::div");
        }
    }
}