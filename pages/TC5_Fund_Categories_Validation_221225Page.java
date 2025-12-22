package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

public class FundCategoriesPage {
    private WebDriver driver;
    private WebDriverWait wait;

    // Locators
    private By contractSelector = By.id("contractSelector");
    private By contractWithDebtFunds = By.xpath("//div[@class='contract-item'][@data-debt-funds='true']");
    private By contractWithoutInvestments = By.xpath("//div[@class='contract-item'][@data-no-investments='true']");
    private By compositionBreakdownButton = By.id("compositionBreakdownBtn");
    private By breakdownPopup = By.id("breakdownPopup");
    private By debtFundsCategory = By.xpath("//div[@class='fund-category' and contains(text(), 'Fondos de deuda')]");
    private By debtFundsValue = By.xpath("//div[@class='fund-category' and contains(text(), 'Fondos de deuda')]/following-sibling::div[@class='fund-value']");
    private By hedgeFundsCategory = By.xpath("//div[@class='fund-category' and contains(text(), 'Fondos de cobertura')]");
    private By hedgeFundsValue = By.xpath("//div[@class='fund-category' and contains(text(), 'Fondos de cobertura')]/following-sibling::div[@class='fund-value']");
    private By equityFundsCategory = By.xpath("//div[@class='fund-category' and contains(text(), 'Fondos de renta variable')]");
    private By equityFundsValue = By.xpath("//div[@class='fund-category' and contains(text(), 'Fondos de renta variable')]/following-sibling::div[@class='fund-value']");
    private By luminaServiceStatus = By.id("luminaServiceStatus");
    private By allFundCategories = By.className("fund-category");

    // Constructor
    public FundCategoriesPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    // Methods
    public boolean verifyLuminaServices() {
        try {
            WebElement status = wait.until(ExpectedConditions.presenceOfElementLocated(luminaServiceStatus));
            return status.getText().equals("operational");
        } catch (Exception e) {
            return false;
        }
    }

    public boolean verifyContractsAvailable() {
        try {
            wait.until(ExpectedConditions.presenceOfElementLocated(contractSelector));
            return driver.findElements(By.className("contract-item")).size() > 0;
        } catch (Exception e) {
            return false;
        }
    }

    public void selectContractWithDebtFunds() {
        wait.until(ExpectedConditions.elementToBeClickable(contractWithDebtFunds)).click();
    }

    public void selectContractWithoutInvestments() {
        wait.until(ExpectedConditions.elementToBeClickable(contractWithoutInvestments)).click();
    }

    public void clickCompositionBreakdown() {
        wait.until(ExpectedConditions.elementToBeClickable(compositionBreakdownButton)).click();
    }

    public boolean isBreakdownPopupVisible() {
        try {
            return wait.until(ExpectedConditions.visibilityOfElementLocated(breakdownPopup)).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean areFundCategoriesPresent() {
        try {
            return driver.findElements(allFundCategories).size() >= 3;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isDebtFundsCategoryVisible() {
        try {
            return wait.until(ExpectedConditions.visibilityOfElementLocated(debtFundsCategory)).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public String getDebtFundsValue() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(debtFundsValue)).getText();
    }

    public boolean isHedgeFundsCategoryVisible() {
        try {
            return wait.until(ExpectedConditions.visibilityOfElementLocated(hedgeFundsCategory)).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public String getHedgeFundsValue() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(hedgeFundsValue)).getText();
    }

    public boolean isEquityFundsCategoryVisible() {
        try {
            return wait.until(ExpectedConditions.visibilityOfElementLocated(equityFundsCategory)).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public String getEquityFundsValue() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(equityFundsValue)).getText();
    }

    public String getLuminaDebtFundsValue() {
        WebElement luminaData = driver.findElement(By.id("luminaDebtFundsData"));
        return luminaData.getAttribute("data-value");
    }

    public String getLuminaHedgeFundsValue() {
        WebElement luminaData = driver.findElement(By.id("luminaHedgeFundsData"));
        return luminaData.getAttribute("data-value");
    }

    public String getLuminaEquityFundsValue() {
        WebElement luminaData = driver.findElement(By.id("luminaEquityFundsData"));
        return luminaData.getAttribute("data-value");
    }
}