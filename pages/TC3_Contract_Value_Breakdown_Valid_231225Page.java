package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;
import java.util.regex.Pattern;

public class ContractValueBreakdownPage {
    private WebDriver driver;
    private WebDriverWait wait;

    // Locators for authentication
    private By userAuthIndicator = By.id("user-authenticated");

    // Locators for contract selection
    private By casaDeBolsaContractSelector = By.xpath("//div[contains(@class, 'contract-selector')]//span[text()='Casa de Bolsa']");
    private By bancoContractSelector = By.xpath("//div[contains(@class, 'contract-selector')]//span[text()='Banco']");
    private By selectedCasaDeBolsaContract = By.xpath("//div[contains(@class, 'contract-selected')]//span[contains(text(), 'Casa de Bolsa')]");
    private By selectedBancoContract = By.xpath("//div[contains(@class, 'contract-selected')]//span[contains(text(), 'Banco')]");

    // Locators for total value component
    private By totalValueComponent = By.id("total-contract-value");
    private By valueBreakdownButton = By.xpath("//button[@id='open-breakdown']|//a[contains(@class, 'breakdown-link')]");

    // Locators for breakdown popup
    private By breakdownPopup = By.id("breakdown-popup");
    private By closePopupButton = By.xpath("//button[@id='close-popup']|//button[contains(@class, 'close-breakdown')]");

    // Locators for financial items
    private By poderDeCompraMXNLabel = By.xpath("//div[contains(@class, 'breakdown-item')]//span[contains(text(), 'Poder de compra MXN')]");
    private By poderDeCompraMXNValue = By.xpath("//div[contains(@class, 'breakdown-item')]//span[contains(text(), 'Poder de compra MXN')]/following-sibling::span[@class='value']");
    private By efectivoMXNLabel = By.xpath("//div[contains(@class, 'breakdown-item')]//span[contains(text(), 'Efectivo MXN')]");
    private By efectivoMXNValue = By.xpath("//div[contains(@class, 'breakdown-item')]//span[contains(text(), 'Efectivo MXN')]/following-sibling::span[@class='value']");

    // Locators for service validation
    private By asesorModuleStatus = By.id("asesor-module-status");
    private By sapPasivosStatus = By.id("sap-pasivos-status");

    // Monetary format pattern
    private Pattern monetaryPattern = Pattern.compile("^\\$?[0-9]{1,3}(,[0-9]{3})*\\.[0-9]{2}$");

    public ContractValueBreakdownPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    public void verifyUserAuthentication() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(userAuthIndicator));
    }

    public boolean isCasaDeBolsaContractAvailable() {
        try {
            return driver.findElement(casaDeBolsaContractSelector).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isBancoContractAvailable() {
        try {
            return driver.findElement(bancoContractSelector).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isAsesorModuleOperational() {
        try {
            WebElement status = driver.findElement(asesorModuleStatus);
            return status.getAttribute("data-status").equals("operational");
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isSAPPasivosAvailable() {
        try {
            WebElement status = driver.findElement(sapPasivosStatus);
            return status.getAttribute("data-status").equals("available");
        } catch (Exception e) {
            return false;
        }
    }

    public void selectCasaDeBolsaContract() {
        wait.until(ExpectedConditions.elementToBeClickable(casaDeBolsaContractSelector)).click();
    }

    public void selectBancoContract() {
        wait.until(ExpectedConditions.elementToBeClickable(bancoContractSelector)).click();
    }

    public boolean isTotalValueComponentDisplayed() {
        try {
            return wait.until(ExpectedConditions.visibilityOfElementLocated(totalValueComponent)).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public void openValueBreakdownPopup() {
        wait.until(ExpectedConditions.elementToBeClickable(valueBreakdownButton)).click();
    }

    public boolean isBreakdownPopupDisplayed() {
        try {
            return wait.until(ExpectedConditions.visibilityOfElementLocated(breakdownPopup)).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public void closeBreakdownPopup() {
        wait.until(ExpectedConditions.elementToBeClickable(closePopupButton)).click();
        wait.until(ExpectedConditions.invisibilityOfElementLocated(breakdownPopup));
    }

    public boolean isPoderDeCompraMXNDisplayed() {
        try {
            return driver.findElement(poderDeCompraMXNLabel).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isEfectivoMXNDisplayed() {
        try {
            return driver.findElement(efectivoMXNLabel).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public String getPoderDeCompraMXNValue() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(poderDeCompraMXNValue)).getText();
    }

    public String getEfectivoMXNValue() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(efectivoMXNValue)).getText();
    }

    public boolean validatePoderDeCompraValue(String value) {
        return value != null && !value.isEmpty() && monetaryPattern.matcher(value.replace("$", "").trim()).matches();
    }

    public boolean validateEfectivoMXNValue(String value) {
        return value != null && !value.isEmpty() && monetaryPattern.matcher(value.replace("$", "").trim()).matches();
    }

    public boolean isBancoContractSelected() {
        try {
            return driver.findElement(selectedBancoContract).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean validateMonetaryFormat() {
        try {
            if (isPoderDeCompraMXNDisplayed()) {
                String value = getPoderDeCompraMXNValue().replace("$", "").replace(",", "").trim();
                if (!monetaryPattern.matcher(value).matches()) {
                    return false;
                }
            }
            if (isEfectivoMXNDisplayed()) {
                String value = getEfectivoMXNValue().replace("$", "").replace(",", "").trim();
                if (!monetaryPattern.matcher(value).matches()) {
                    return false;
                }
            }
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}