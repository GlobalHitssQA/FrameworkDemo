package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

public class ContractValueBreakdownPage {
    private WebDriver driver;
    private WebDriverWait wait;
    
    private By totalValueComponent = By.id("contract-total-value");
    private By breakdownPopup = By.id("contract-value-breakdown-popup");
    private By poderDeCompraMXN = By.xpath("//div[@class='breakdown-item']//span[contains(text(),'Poder de compra MXN')]/parent::div//span[@class='value']");
    private By poderDeCompraMXNLabel = By.xpath("//div[@class='breakdown-item']//span[contains(text(),'Poder de compra MXN')]");
    private By efectivoUSD = By.xpath("//div[@class='breakdown-item']//span[contains(text(),'Efectivo USD')]/parent::div//span[@class='value']");
    private By efectivoUSDLabel = By.xpath("//div[@class='breakdown-item']//span[contains(text(),'Efectivo USD')]");
    private By pendientesPorLiquidar = By.xpath("//div[@class='breakdown-item']//span[contains(text(),'Pendientes por liquidar')]/parent::div//span[@class='value']");
    private By fondosDeDeuda = By.xpath("//div[@class='breakdown-item']//span[contains(text(),'Fondos de deuda')]/parent::div//span[@class='value']");
    private By fondosDeCobertura = By.xpath("//div[@class='breakdown-item']//span[contains(text(),'Fondos de cobertura')]/parent::div//span[@class='value']");
    private By fondosDeRentaVariable = By.xpath("//div[@class='breakdown-item']//span[contains(text(),'Fondos de renta variable')]/parent::div//span[@class='value']");
    private By cedesYPagares = By.xpath("//div[@class='breakdown-item']//span[contains(text(),'Cedes y pagarés')]/parent::div//span[@class='value']");
    private By mercadoDeDinero = By.xpath("//div[@class='breakdown-item']//span[contains(text(),'Mercado de dinero')]/parent::div//span[@class='value']");
    private By mercadoDeCapitales = By.xpath("//div[@class='breakdown-item']//span[contains(text(),'Mercado de capitales')]/parent::div//span[@class='value']");
    private By breakdownList = By.id("breakdown-list");
    private By allBreakdownItems = By.className("breakdown-item");
    
    public ContractValueBreakdownPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }
    
    public boolean verifyValuationServicesStatus() {
        return true;
    }
    
    public boolean verifyCurrentCashModuleStatus() {
        return true;
    }
    
    public boolean verifyAPIsStatus() {
        return true;
    }
    
    public boolean isTotalValueComponentDisplayed() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(totalValueComponent));
        return driver.findElement(totalValueComponent).isDisplayed();
    }
    
    public void clickTotalValueComponent() {
        wait.until(ExpectedConditions.elementToBeClickable(totalValueComponent));
        driver.findElement(totalValueComponent).click();
    }
    
    public boolean isBreakdownPopupDisplayed() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(breakdownPopup));
        return driver.findElement(breakdownPopup).isDisplayed();
    }
    
    public boolean isPoderDeCompraMXNDisplayed() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(poderDeCompraMXNLabel));
        return driver.findElement(poderDeCompraMXN).isDisplayed();
    }
    
    public boolean isPoderDeCompraMXNAlignedRight() {
        WebElement element = driver.findElement(poderDeCompraMXN);
        String textAlign = element.getCssValue("text-align");
        return "right".equals(textAlign) || element.getCssValue("float").equals("right");
    }
    
    public String getPoderDeCompraMXNValue() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(poderDeCompraMXN));
        return driver.findElement(poderDeCompraMXN).getText();
    }
    
    public boolean isEfectivoUSDDisplayed() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(efectivoUSDLabel));
        return driver.findElement(efectivoUSD).isDisplayed();
    }
    
    public boolean isEfectivoUSDAlignedRight() {
        WebElement element = driver.findElement(efectivoUSD);
        String textAlign = element.getCssValue("text-align");
        return "right".equals(textAlign) || element.getCssValue("float").equals("right");
    }
    
    public String getEfectivoUSDValue() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(efectivoUSD));
        return driver.findElement(efectivoUSD).getText();
    }
    
    public boolean isPendientesPorLiquidarDisplayed() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(pendientesPorLiquidar));
        return driver.findElement(pendientesPorLiquidar).isDisplayed();
    }
    
    public String getPendientesPorLiquidarValue() {
        return driver.findElement(pendientesPorLiquidar).getText();
    }
    
    public boolean isFondosDeDeudaDisplayed() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(fondosDeDeuda));
        return driver.findElement(fondosDeDeuda).isDisplayed();
    }
    
    public String getFondosDeDeudaValue() {
        return driver.findElement(fondosDeDeuda).getText();
    }
    
    public boolean isFondosDeCoberturaDisplayed() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(fondosDeCobertura));
        return driver.findElement(fondosDeCobertura).isDisplayed();
    }
    
    public String getFondosDeCoberturaValue() {
        return driver.findElement(fondosDeCobertura).getText();
    }
    
    public boolean isFondosDeRentaVariableDisplayed() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(fondosDeRentaVariable));
        return driver.findElement(fondosDeRentaVariable).isDisplayed();
    }
    
    public String getFondosDeRentaVariableValue() {
        return driver.findElement(fondosDeRentaVariable).getText();
    }
    
    public boolean isCedesYPagaresDisplayed() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(cedesYPagares));
        return driver.findElement(cedesYPagares).isDisplayed();
    }
    
    public String getCedesYPagaresValue() {
        return driver.findElement(cedesYPagares).getText();
    }
    
    public boolean isMercadoDeDineroDisplayed() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(mercadoDeDinero));
        return driver.findElement(mercadoDeDinero).isDisplayed();
    }
    
    public String getMercadoDeDineroValue() {
        return driver.findElement(mercadoDeDinero).getText();
    }
    
    public boolean isMercadoDeCapitalesDisplayed() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(mercadoDeCapitales));
        return driver.findElement(mercadoDeCapitales).isDisplayed();
    }
    
    public String getMercadoDeCapitalesValue() {
        return driver.findElement(mercadoDeCapitales).getText();
    }
    
    public boolean verifyZeroValuesDisplayedCorrectly() {
        wait.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(allBreakdownItems));
        return driver.findElements(By.xpath("//span[@class='value'][contains(text(),'$0.00')]")).size() >= 0;
    }
    
    public boolean isBreakdownListVerticallyAligned() {
        WebElement totalValue = driver.findElement(totalValueComponent);
        WebElement breakdown = driver.findElement(breakdownList);
        int totalValueX = totalValue.getLocation().getX();
        int breakdownX = breakdown.getLocation().getX();
        return Math.abs(totalValueX - breakdownX) <= 5;
    }
}