import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const categories = [
  { id: 'all', name: 'Все категории', icon: 'Grid3x3' },
  { id: 'electronics', name: 'Электроника', icon: 'Laptop' },
  { id: 'fashion', name: 'Одежда', icon: 'ShoppingBag' },
  { id: 'food', name: 'Еда и доставка', icon: 'UtensilsCrossed' },
  { id: 'travel', name: 'Путешествия', icon: 'Plane' },
  { id: 'beauty', name: 'Красота', icon: 'Sparkles' }
];

const promoCodes = [
  {
    id: 1,
    title: 'Скидка 30% на всё',
    store: 'TechStore',
    code: 'TECH30',
    discount: '30%',
    category: 'electronics',
    validUntil: '2025-12-31',
    description: 'Получите скидку 30% на любую технику',
    hot: true
  },
  {
    id: 2,
    title: 'Бесплатная доставка',
    store: 'FashionHub',
    code: 'FREESHIP',
    discount: '100% на доставку',
    category: 'fashion',
    validUntil: '2025-11-30',
    description: 'Бесплатная доставка при заказе от 2000₽',
    hot: false
  },
  {
    id: 3,
    title: '500₽ на первый заказ',
    store: 'FoodDelivery',
    code: 'FIRST500',
    discount: '500₽',
    category: 'food',
    validUntil: '2025-12-15',
    description: 'Скидка 500₽ для новых пользователей',
    hot: true
  },
  {
    id: 4,
    title: 'Скидка 20% на билеты',
    store: 'TravelWorld',
    code: 'TRAVEL20',
    discount: '20%',
    category: 'travel',
    validUntil: '2026-01-31',
    description: 'Экономьте на путешествиях',
    hot: false
  },
  {
    id: 5,
    title: '2+1 на косметику',
    store: 'BeautyShop',
    code: 'BEAUTY2',
    discount: '3 по цене 2',
    category: 'beauty',
    validUntil: '2025-12-20',
    description: 'Три товара по цене двух',
    hot: true
  },
  {
    id: 6,
    title: 'Скидка 15% на ноутбуки',
    store: 'GadgetStore',
    code: 'LAPTOP15',
    discount: '15%',
    category: 'electronics',
    validUntil: '2025-12-10',
    description: 'Специальное предложение на ноутбуки',
    hot: false
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { toast } = useToast();

  const filteredPromoCodes = promoCodes.filter((promo) => {
    const matchesSearch = promo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      promo.store.toLowerCase().includes(searchQuery.toLowerCase()) ||
      promo.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || promo.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const copyPromoCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: '✅ Промокод скопирован!',
      description: `Код ${code} успешно скопирован в буфер обмена`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary via-secondary to-accent rounded-2xl flex items-center justify-center shadow-lg">
              <Icon name="Tag" size={24} className="text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              PromoHunt
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Лучшие скидки и промокоды от популярных магазинов в одном месте 🎉
          </p>
        </header>

        <div className="max-w-2xl mx-auto mb-12 animate-scale-in">
          <div className="relative">
            <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Поиск промокодов, магазинов..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-lg shadow-lg border-2 focus:border-primary transition-all"
            />
          </div>
        </div>

        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-12">
          <TabsList className="grid grid-cols-3 md:grid-cols-6 gap-2 h-auto bg-transparent p-0">
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="flex flex-col gap-2 p-4 data-[state=active]:bg-gradient-to-br data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white bg-white shadow-md hover:shadow-lg transition-all rounded-xl"
              >
                <Icon name={category.icon} size={24} />
                <span className="text-xs font-medium">{category.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {filteredPromoCodes.length === 0 ? (
          <div className="text-center py-16">
            <Icon name="SearchX" size={64} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Ничего не найдено</h3>
            <p className="text-muted-foreground">Попробуйте изменить запрос или выбрать другую категорию</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPromoCodes.map((promo, index) => (
              <Card
                key={promo.id}
                className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border-2 hover:border-primary animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="h-2 bg-gradient-to-r from-primary via-secondary to-accent" />
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="secondary" className="bg-gradient-to-r from-purple-100 to-pink-100">
                      {promo.store}
                    </Badge>
                    {promo.hot && (
                      <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white animate-pulse">
                        🔥 HOT
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl">{promo.title}</CardTitle>
                  <CardDescription>{promo.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icon name="Calendar" size={16} />
                      <span>Действует до {new Date(promo.validUntil).toLocaleDateString('ru-RU')}</span>
                    </div>
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border-2 border-dashed border-primary/30">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Промокод:</p>
                          <p className="font-mono font-bold text-2xl text-primary">{promo.code}</p>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => copyPromoCode(promo.code)}
                          className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shrink-0"
                        >
                          <Icon name="Copy" size={16} className="mr-2" />
                          Копировать
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2">
                        <Icon name="TrendingDown" size={20} className="text-green-600" />
                        <span className="font-semibold text-lg text-green-600">{promo.discount}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                        Подробнее
                        <Icon name="ArrowRight" size={16} className="ml-2" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <section className="mt-20 mb-12 bg-white rounded-3xl p-12 shadow-xl border-2 animate-fade-in">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full mb-6 shadow-lg">
              <Icon name="Sparkles" size={40} className="text-white" />
            </div>
            <h2 className="text-4xl font-bold mb-4">О сервисе PromoHunt</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Мы собираем лучшие скидки и промокоды от топовых интернет-магазинов России. 
              Экономьте время и деньги с PromoHunt — вашим надежным помощником в поиске выгодных предложений!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                  <Icon name="Zap" size={28} className="text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Быстрый поиск</h3>
                <p className="text-sm text-muted-foreground">Находите нужные промокоды за секунды</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-100 rounded-full mb-4">
                  <Icon name="Shield" size={28} className="text-secondary" />
                </div>
                <h3 className="font-semibold mb-2">Проверенные коды</h3>
                <p className="text-sm text-muted-foreground">Только актуальные и рабочие промокоды</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                  <Icon name="Bell" size={28} className="text-accent" />
                </div>
                <h3 className="font-semibold mb-2">Новинки каждый день</h3>
                <p className="text-sm text-muted-foreground">Свежие предложения ежедневно</p>
              </div>
            </div>
          </div>
        </section>

        <footer className="text-center py-8 text-muted-foreground">
          <p>© 2025 PromoHunt. Экономьте с умом! 💰</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
