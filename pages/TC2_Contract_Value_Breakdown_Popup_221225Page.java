package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;
import java.util.List;
import java.util.regex.Pattern;

public class ContractValuePage {
    private WebDriver driver;
    private WebDriverWait wait;

    private By contractValueComponent = By.id("contract-value-component");
    private By breakdownPopup = By.id("breakdown-popup");
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
    private By allBreakdownItems = By.cssSelector(".breakdown-item");
    private By monetaryValues = By.cssSelector(".breakdown-item .monetary-value");
    private By loginButton = By.id("login-btn");
    private By contractSelector = By.id("contract-select");

    public ContractValuePage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    public void navigateToActicenter() {
        driver.get("https://acticenter.com");
    }

    public void login() {
        wait.until(ExpectedConditions.elementToBeClickable(loginButton));
        driver.findElement(loginButton).click();
    }

    public void selectContract() {
        wait.until(ExpectedConditions.elementToBeClickable(contractSelector));
        driver.findElement(contractSelector).click();
    }

    public boolean areValuationServicesAvailable() {
        try {
            wait.until(ExpectedConditions.presenceOfElementLocated(contractValueComponent));
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isContractValueComponentVisible() {
        return driver.findElement(contractValueComponent).isDisplayed();
    }

    public void clickContractValueComponent() {
        wait.until(ExpectedConditions.elementToBeClickable(contractValueComponent));
        driver.findElement(contractValueComponent).click();
    }

    public boolean isBreakdownPopupDisplayed() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(breakdownPopup));
        return driver.findElement(breakdownPopup).isDisplayed();
    }

    public boolean verifyApplicableItemsPresent() {
        List<WebElement> items = driver.findElements(allBreakdownItems);
        return items.size() > 0;
    }

    public boolean verifyMonetaryValuesFormat() {
        List<WebElement> values = driver.findElements(monetaryValues);
        Pattern moneyPattern = Pattern.compile("^(\\$|USD \\$)?[0-9]{1,3}(,[0-9]{3})*\\.[0-9]{2}$");
        
        for (WebElement value : values) {
            String text = value.getText().trim();
            if (!moneyPattern.matcher(text).matches()) {
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
        
        return Math.abs(componentX - popupX) < 10;
    }

    public boolean verifyZeroValuesFormat() {
        List<WebElement> values = driver.findElements(monetaryValues);
        Pattern zeroPattern = Pattern.compile("^(\\$|USD \\$)?0\\.00$");
        
        for (WebElement value : values) {
            String text = value.getText().trim();
            if (text.equals("$0.00") || text.equals("USD $0.00")) {
                if (!zeroPattern.matcher(text).matches()) {
                    return false;
                }
            }
        }
        return true;
    }
}